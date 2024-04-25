import { Mcq } from "../models/mcq.model";
import { ApiError } from "../utils/ApiError";

async function createQuestion(data: any) {

    try {
        const newQuestion = await Mcq.create({ question: data.question, options: [data.option1, data.option2, data.option3, data.option4], correct: data.correctOption, explain: data.explaination, subject: data.selectedSubject, topic: data.selectedTopic, section: data.selectedSection, exam: data.selectedExam });
        return newQuestion
    } catch (error) {
        console.log(error);
        throw new ApiError(
            500, 'Something went wrong!'
        )
    }


}


export { createQuestion }