import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ADDSTUDENT,
  ADDTEACHERS,
  CLASSSCHEDULES,
  CLASSSCHEDULESID,
  Home,
  LISTOFSUBJECTS,
  ListOfClasses,
  ListOfClassesID,
  MYCLASSES,
  MYCLASSESID,
  PROFIL,
  PageNoteFound,
  REGISTER,
  STUDENTPROFILE,
  STUDENTS,
  TEACHER,
} from "../components";
import { LAYOUT } from "../template";

function ReactRouter() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Routes>
        <Route path="/" element={<LAYOUT />}>
          <Route path="" element={<Home />} />
          <Route path="list-of-subjects" element={<LISTOFSUBJECTS />} />
          <Route path="list-of-subjects/:id" element={<LISTOFSUBJECTS />} />
          <Route path="list-of-classes" element={<ListOfClasses />} />
          <Route path="list-of-classes/:id" element={<ListOfClassesID />} />
          <Route path="class-schedule" element={<CLASSSCHEDULES />} />
          <Route path="class-schedule/:id" element={<CLASSSCHEDULESID />} />
          <Route path="teachers" element={<TEACHER />} />
          <Route path="students" element={<STUDENTS />} />
          <Route path="students/:id" element={<STUDENTPROFILE />} />
          <Route path="profile" element={<PROFIL />} />\
          <Route path="add-student" element={<ADDSTUDENT />} />
          <Route path="add-teachers" element={<ADDTEACHERS />} />

        </Route>
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/register" element={<REGISTER />} />
      </Routes>
    </div>
  );
}

export default ReactRouter;
