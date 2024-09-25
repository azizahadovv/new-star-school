import {
  toast
} from "react-toastify";
import axios from "./api";

const auth = {
  headers: {
    accept: "*/*",
    Authorization: " " + "Bearer " + localStorage.getItem("jwtToken"),
  },
};

const teacherController = {
  async getArchivedUser() {
    return await axios
      .get(`teachers/archived`, auth)
      .then(({
        data
      }) => {
        return data;
      })
      .catch((error) => {
        return toast.error(`Error get archived user \n ${error.massage}`);
      });
  },

  async changePositionTeacher(teacherId, teacherRole) {

    return await axios.put(`teachers/${teacherId}/assign-role?${teacherRole}`, {}, auth).then(({
      data
    }) => {
      toast.success(`Successfully changed`, data)
      return data;
    })
      .catch((error) => {
        return toast.error(`Error get archived user \n ${error.massage}`);
      });
  },

  async searchTeacher(techerName, subjectId) {
    try {
      const {
        data
      } = await axios.get(
        `teachers/search?subjectId=${subjectId}&name=${techerName}`,
        auth
      );
      return data;
    } catch (error) {
      toast.error(error);
    }
  },
  async postTeacherInSubjectId(teacherSubjectId, dataTeacher, role) {
    try {
      await axios.post(
        `teachers?subjectId=${teacherSubjectId}&role=${role}`,
        dataTeacher,
        auth
      );
    } catch (error) {
      toast.error(`Error get techer \n ${error}`);
    }
  },

  async putTeacher(teacherId, subjectId, dataTeacher) {
    try {
      await axios.put(
        `teachers/${teacherId}?subjectId=${subjectId}`,
        dataTeacher,
        auth
      )
    } catch (error) {
      toast.error(`Error put teacher \n ${error}`);
    }
  },

  async getTeacher() {
    try {
      const {
        data
      } = await axios.get(`teachers`, auth);
      return data;
    } catch (error) {
      toast.error(`Error get techer \n ${error}`);
    }
  },
  async getTeacherInId(teacherId) {
    try {
      const {
        data
      } = await axios.get(`teachers/${teacherId}`, auth);
      return data;
    } catch (error) {
      toast.error(`Error get techer \n ${error}`);
    }
  },
  async removeTeacher(teacherId) {
    try {
      await axios.delete(`teachers/${teacherId}`, auth);
      toast.success(`Successfully removed`);
    } catch (error) {
      toast.error(`Error delete teacher \n ${error}`);
    }
  },

  async getTeacherInSubjectIdAndChaced(weekDay, schoolTimeId, subjectId) {
    try {
      const {
        data
      } = await axios.get(
        `teachers/available?dayOfWeek=${weekDay}&schoolTimeId=${schoolTimeId}&subjectId=${subjectId}`,
        auth
      );
      return data;
    } catch (error) {
      toast.error(`Error get techer \n ${error}`);
    }
  },
  async uploadImg(teacherId, file) {
    try {
      await axios.post(`teachers/${teacherId}/upload-image`, file, auth)
      toast.success("success upload");
    } catch (error) {
      toast.error(error);
    }
  },
  async getImage(imgId) {
    return await axios.get(`v1/files/${imgId}`, auth).then(({
      data
    }) => {
      return data;
    })
      .catch((error) => {
        return toast.error(`Error get archived user \n ${error.massage}`);
      });

  },
};

export default teacherController;