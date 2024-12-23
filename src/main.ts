import { NestFactory } from '@nestjs/core';
import express, { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpExceptionFilter } from "./utils/exception_filter";
import { ValidationPipe } from '@nestjs/common';
import helmet from "helmet";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";



const PORT: number = <number>(process?.env?.PORT ?? 3000);
let httpsOptions: any = {}

if (process.env?.NODE_ENV === "development") {
  httpsOptions["key"] = fs.readFileSync(path.join(process.cwd(), "ssl_certificates", "private-key.pem"));
  httpsOptions["cert"] = fs.readFileSync(path.join(process.cwd(), "ssl_certificates", "certificate.pem"));
}



async function bootstrap() {
  const expressServer = express();
  let server: http.Server | https.Server;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressServer), {
    logger: ["error", "warn"]
  });

  await app.init();

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalFilters(new HttpExceptionFilter());


  if (process?.env?.NODE_ENV?.toLocaleLowerCase() === "development") {
    server = http.createServer(expressServer).listen(PORT, () => {
      console.log(`Server started at 🚀 http://localhost:${PORT}`)
    });
  }
  else {
    server = https.createServer(httpsOptions, expressServer).listen(PORT, () => {
      console.log(`Server started at 🚀 https://localhost:${PORT}`)
    });
  }
}

bootstrap();
