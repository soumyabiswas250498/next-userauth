
"use client";
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectSection from './SubjectSection';
import TopicSection from './TopicSection';
import SectionsSection from './SectionsSection';
import ExamSection from './ExamSection';



function CategorySection() {
    return (
        <div className='w-full border-2 border-primary/50 rounded-md p-2'>
            <Tabs defaultValue="subject" className="w-full">
                <TabsList className='w-full h-16 flex justify-center gap-2'>
                    <TabsTrigger value="subject" className='text-base md:text-xl'>Subject</TabsTrigger>
                    <TabsTrigger value="topic" className='text-base md:text-xl'>Topic</TabsTrigger>
                    <TabsTrigger value="section" className='text-base md:text-xl'>Section</TabsTrigger>
                    <TabsTrigger value="exam" className='text-base md:text-xl'>Exam</TabsTrigger>
                </TabsList>
                <TabsContent value="subject">
                    <SubjectSection />
                </TabsContent>
                <TabsContent value="topic">
                    <TopicSection />
                </TabsContent>
                <TabsContent value="section">
                    <SectionsSection />
                </TabsContent>
                <TabsContent value="exam">
                    <ExamSection />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default CategorySection