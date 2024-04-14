import Subject from "../models/subject.model";
import Topic from "../models/topic.model";
import Section from "../models/section.model";
import Exam from "../models/exam.model";
import { ApiError } from "../utils/ApiError";



async function createCategory(type: string, label: string, subject?: string, section?: string) {
    try {
        let data;
        if (type === 'subject') {
            data = await Subject.create({ subject: label });
            return data;
        }
        if (type === 'topic') {
            const sub: any = await Subject.findOne({ subject: subject });
            data = await Topic.create({ topic: label, subject: subject, subjectId: sub._id })
            return data;

        }
        if (type === 'section') {
            data = await Section.create({ section: label });
            return data;
        }
        if (type === 'exam') {
            const sec: any = await Section.findOne({ section: section });
            console.log(sec, '***sec');
            data = await Exam.create({ exam: label, section: sec.section, sectionId: sec._id });
            console.log(data, '***data')
            return data;
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new ApiError(
            500, 'Something went wrong!'
        )
    }
}


async function getCategories(type: string, category?: string | null) {
    try {
        let data;
        if (type === 'subject') {
            data = await Subject.find()
        }
        if (type === 'topic') {
            if (category) {
                data = await Topic.find({ subject: category })
            } else {
                data = await Topic.find()
            }
        }
        if (type === 'section') {
            data = await Section.find()
        }
        if (type === 'exam') {
            if (category) {
                data = await Exam.find({ section: category })
            } else {
                data = await Exam.find()
            }
        }
        return data;
    } catch (error) {
        console.log(error)
        throw new ApiError(
            500, 'Something went wrong!'
        )
    }
}

async function updateCategories(type: string, id: string, newLabel: string) {
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
        return data
    } catch (error) {
        console.log(error, '***updateCategories')
        throw new ApiError(
            500, 'Something went wrong!'
        )
    }
}



async function deleteCategory(type: string, id: string) {
    try {
        let data;
        if (type === 'subject') {
            data = await Subject.findByIdAndDelete(id);
        }
        if (type === 'topic') {
            data = await Topic.findByIdAndDelete(id);
        }
        if (type === 'section') {
            data = await Section.findByIdAndDelete(id);
        }
        if (type === 'exam') {
            data = await Exam.findByIdAndDelete(id);
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(
            500, 'Something went wrong!'
        )
    }

}

export { getCategories, updateCategories, createCategory, deleteCategory }