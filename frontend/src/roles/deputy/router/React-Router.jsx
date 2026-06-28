import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ADDSTUDENT,
  ADDTEACHERS,
  CLASSSCHEDULES,
  CLASSSCHEDULESID,
  GRADESSTUDENTS,
  Home,
  ListOfClasses,
  ListOfClassesID,
  MYCLASSES,
  MYCLASSESID,
  MYSCHEDULE,
  PROFIL,
  PageNoteFound,
  REGISTER,
  STUDENTPROFILE,
  STUDENTS,
  TEACHER,
  TEACHERPROFILE,
  VIEWSGRADE,
} from "../components";
import { LAYOUT } from "../template";
import { CLASSSCHEDULETABLE } from "../ui";

function ReactRouter() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Routes>
        <Route path="/" element={<LAYOUT />}>
          <Route path="" element={<Home />} />
          <Route path="list-of-classes" element={<ListOfClasses />} />
          <Route path="list-of-classes/:id" element={<ListOfClassesID />} />
          <Route path="class-schedule" element={<CLASSSCHEDULES />} />
          <Route path="class-schedule/grade/:id" element={<CLASSSCHEDULESID />} />
          <Route path="teachers" element={<TEACHER />} />
          <Route path="teacher-profile/:id" element={<TEACHERPROFILE />} />
          <Route path="add-teachers" element={<ADDTEACHERS />} />
          <Route path="add-teachers/:id" element={<ADDTEACHERS />} />
          <Route path="students" element={<STUDENTS />} />
          <Route path="students/:id" element={<STUDENTPROFILE />} />
          <Route path="profile" element={<PROFIL />} />\
          <Route path="add-student" element={<ADDSTUDENT />} />
          <Route path="add-student/:id" element={<ADDSTUDENT />} />
          <Route path="my-classes" element={<MYCLASSES />} />

          <Route path="my-classes/mark-students" element={<MYCLASSESID />} />
          <Route path='my-classes/mark-students/grade/:id' element={<GRADESSTUDENTS />} />
          <Route path='my-classes/mark-students/view-ratings/:id' element={<VIEWSGRADE />} />

          <Route path="my-classes/my-schedule" element={<MYSCHEDULE />} />
        </Route>
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/login" element={<REGISTER />} />
      </Routes>
    </div>
  );
}

export default ReactRouter;
