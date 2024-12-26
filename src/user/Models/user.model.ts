import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false
})
export class User {
    @Prop({ trim: true, required: true })
    first_name: string

    @Prop({ trim: true })
    last_name: string

    @Prop({ unique: true, trim: true })
    email: string

    @Prop({ trim: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)