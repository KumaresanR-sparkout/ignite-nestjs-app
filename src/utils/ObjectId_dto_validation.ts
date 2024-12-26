import { IsMongoId } from "class-validator";

export class ObjectIdValidationParam {

    @IsMongoId({message:"Please send proper id"})
    id: string
}