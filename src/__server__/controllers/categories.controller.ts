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

async function updateCategories(type: string, id: string, newLabel: string) {
    console.log(type, id, newLabel)
    try {
        let data;
        if (type === 'subject') {
            data = await Subject.findByIdAndUpdate(id, { subject: newLabel }, { new: true })
        }
        if (type === 'topic') {
            data = await Topic.findByIdAndUpdate(id, { topic: newLabel }, { new: true })
        }
        if (type === 'section') {
            data = await Section.findByIdAndUpdate(id, { section: newLabel }, { new: true })
        }
        if (type === 'exam') {
            data = await Exam.findByIdAndUpdate(id, { exam: newLabel }, { new: true })
        }
        console.log(data)
        return data
    } catch (error) {
        console.log(error, '***')
    }
}

export { getCategories, updateCategories }