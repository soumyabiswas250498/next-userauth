import Subject from "../models/subject.model";
import Topic from "../models/topic.model";
import Section from "../models/section.model";
import Exam from "../models/exam.model";


async function getCategories(type: string, subject?: string | null) {
    try {
        let data;
        if (type === 'subject') {
            data = await Subject.find()
        }
        if (type === 'topic') {
            if (subject) {
                data = await Topic.find({ subject: subject })
            } else {
                data = await Topic.find()
            }
        }
        if (type === 'section') {
            data = await Section.find()
        }
        if (type === 'exam') {
            data = await Exam.find()
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

export { getCategories }