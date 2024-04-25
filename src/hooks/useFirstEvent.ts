import useAdminHook from "./useAdminHook"



function useFirstEvent() {
    const { fetchCategories } = useAdminHook()
    const categoryApiCalls = async () => {
        const subject = await fetchCategories('subject');
        const topic = await fetchCategories('topic');
        const section = await fetchCategories('section');
        const exam = await fetchCategories('exam');
        let subjectObj: any = {};
        subject.map((item: any) => { subjectObj[item.subject] = topic.filter((value: any) => value.subject === item.subject) });
        let sectionObj: any = {};
        section.map((item: any) => { sectionObj[item.section] = exam.filter((value: any) => value.section === item.section) });
        return { subjectObj, sectionObj };
    }
    return { categoryApiCalls }
}

export default useFirstEvent;