import React, { useEffect, useState } from "react";
import FormTitle from "../FormTitle";
import InputWithIcon from "../InputWithIcon";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  HomeIcon,
  CalendarIcon,
  OfficeBuildingIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";
import RadioButton from "../RadioButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormRowSelect from "../FormRowSelect";
import FormRowRadio from "../FormRowRadio";
import Button from "../Button";
import SampleInput from "../SampleInput";
import SkillChoiceRow from "./SkillChoiceRow";
import AddCertificate from "./AddCertificate";
import StepsProgress from "../StepsProgress";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getDate } from "date-fns";
import { data } from "jquery";
import { radio } from "@material-tailwind/react";

import { clearMessage, setMessage } from "../../../redux/message";
import { clearFormData } from "../../../redux/jobApplicationSlice";

const initialState = {
  src: "",
  name: "",
  field: "",
  graduate_year: "",
  duration_study: 0,
};

export default function FormThree() {
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [certificates, setCertificates] = useState(initialState);
  // const [certificatesArray,setCertificatesArray]=useState([])

  const [values, setValues] = useState([]);
  const [radioanswers, setRadioanswers] = useState({});

  //Get job title id
  const { formData } = useSelector((state) => state.jobApplication);
  // console.log(JSON.stringify(formData));

  //Array for simple question with answer
  const [qstAnswers, setQstAnswers] = useState([]);

  //Find job Details
  const [job, setJob] = useState();
  const getJobs = async (e) => {
    await axios
      .get(
        `https://api.sedihisham.com/careers/jobmanagement/${formData[0]?.speciality}`
      )
      .then((res) => {
        setJob(res.data);
        var answersForm = [];
        try {
          res.data.questions.forEach((element) => {
            answersForm.push({ qst: element.text, type: "Simple", answer: "" });
          });
        } catch (error) {
          console.log("Simple Questions error");
        }
        try {
          res.data.multiple_choices.forEach((element) => {
            answersForm.push({
              qst: element.text,
              type_Qst: "Medium",
              answer: "",
            });
          });
        } catch (error) {
          console.log("Medium Questions error");
        }
        try {
          res.data.multiple_question_multi.forEach((element) => {
            element.fields.forEach((q) => {
              answersForm.push({
                qst: q.text,
                type_Qst: "Hard",
                parent_qst: element.text,
                answer: "",
              });
            });
          });
        } catch (error) {
          console.log("Hard Questions error");
        }
        setQstAnswers(answersForm);
      })
      .catch((error) => {
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          )
        );
      });
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (job === undefined) {
      getJobs();
    }
  }, []);

  // useEffect(() => {
  //   getJobs();
  // }, [job]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCertificateChange = (e) => {
    setCertificates({ ...certificates, [e.target.name]: e.target.value });
  };

  // let  = [];
  const [certificatesArray, setCertificatesArray] = useState([]);
  const addCertificate = () => {
    const { duration_study, graduate_year, field, src, name } = certificates;
    if (!duration_study || !graduate_year || !field || !src || !name) {
      dispatch(setMessage("Please fill all fields"));
    } else {
      // if(certificatesArray.length === 0){
      //   certificatesArray.push(certificates)
      // }else{
      setCertificatesArray([
        ...certificatesArray,
        {
          src: certificates.src,
          name: certificates.name,
          field: certificates.field,
          graduate_year: certificates.graduate_year,
          duration_study: parseInt(certificates.duration_study),
        },
      ]);
      // }
      alert("Certifcate added");
    }
  };

  const getAnswer = (text) => {
    console.log(text);
    var reponse;
    if (qstAnswers.length > 0) {
      qstAnswers.forEach((a) => {
        if (a.qst === text) {
          console.log(a.answer);
          reponse = a.answer;
        }
      });
    }
    return reponse;
  };

  const handleFormChange = (event, text) => {
    // console.log(text)
    // console.log(event.target.value)

    let data = qstAnswers;
    // console.log(data.length)
    data.forEach((q) => {
      if (q.qst === text) {
        q.answer = event.target.value;
        if (q.type_Qst == "Hard") {
          var object = radioanswers;
          let key = q.qst;
          object[key] = q.answer;
          setRadioanswers(object);
        }
      }
    });
    setQstAnswers(data);

    // console.log("aswers NOW : " + JSON.stringify(qstAnswers));
    // console.log(text);
    // console.log(getAnswer(text));
  };

  //  useEffect

  //  },[qstAnswers])
  //c
  const [isAnswered, setIsAnswer] = useState(false);
  const postJobApplication = async () => {
    //Check if the user answer all questions
    alert("jg");
    qstAnswers.forEach((item) => {
      if (item.answer === "") {
        dispatch(setMessage("Please answer all questions"));
      } else {
        setIsAnswer(true);
      }
    });
    await axios
      .post("https://api.sedihisham.com/careers/jobapplication", {
        job_position: formData[0].speciality,
        family_status: formData[0].family_status,
        full_name: formData[0].full_name,
        nationalty: formData[0].nationalty,
        birth_place: formData[0].birth_place,
        address: formData[0].address,
        motivation_lettre: formData[0].notes,
        birthday: formData[0].birdthday.slice(0, 10),
        cv_url: formData[0].cv_url.imagePath,
        phone_number: formData[0].phone_number,
        national_id: formData[0].national_id,
        job_managment_id: parseInt(formData[0].speciality),
        sex: formData[0].sex === "true" ? true : false,
        notes: formData[0].notes,
        location: "",
        email: formData[0].email,
        multiple_question_multi: qstAnswers,
        Certificats: certificatesArray,
      })
      .then((res) => {
        alert("Job application submited succesfully");
        router.push("/job-application/jobSubmited");
        dispatch(clearFormData());
      })
      .catch((error) => {
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          )
        );
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const {}
    postJobApplication(e);
  };
  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { local } = useSelector((state) => state.language);
  return (
    <form onSubmit={onSubmit} className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <StepsProgress stepNumber={3} />
      </div>

      <div className="space-y-5">
        <FormTitle
          local={local}
          text={local === "ar" ? "الشهادات المؤهلية" : "Certificates & Qualifications"}
        />

        {/* Certificate Name & Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SampleInput
            local={local}
            name="name"
            label={local === "ar" ? "اسم الشهادة" : "Certificate Name"}
            value={certificates.name}
            handleChange={handleCertificateChange}
            placeholder={local === "ar" ? "الشهادة" : "Certificate name"}
            inputType="text"
          />

          <SampleInput
            local={local}
            label={local === "ar" ? "مصدر الشهادة" : "Source / University"}
            name="src"
            value={certificates.src}
            handleChange={handleCertificateChange}
            placeholder={local === "ar" ? "مصدر الشهادة" : "Source of certificate"}
            inputType="text"
          />
        </div>

        {/* Study Duration, Specialty & Graduation Year */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <SampleInput
            local={local}
            label={local === "ar" ? "مدة الدراسة (سنوات)" : "Study Duration (Years)"}
            name="duration_study"
            value={certificates.duration_study}
            handleChange={handleCertificateChange}
            placeholder="4"
            inputType="number"
          />

          <SampleInput
            local={local}
            label={local === "ar" ? "التخصص" : "Specialty"}
            value={certificates.field}
            name="field"
            handleChange={handleCertificateChange}
            placeholder={local === "ar" ? "التخصص" : "Specialty"}
            inputType="text"
          />

          <SampleInput
            local={local}
            label={local === "ar" ? "سنة التخرج" : "Graduation Year"}
            name="graduate_year"
            value={certificates.graduate_year}
            handleChange={handleCertificateChange}
            placeholder={local === "ar" ? "سنة التخرج" : "Graduation Year"}
            inputType="date"
          />
        </div>

        {/* Add Certificate Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-arabicBold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2"
            onClick={addCertificate}
          >
            <span>+</span>
            <span>{local === "ar" ? "إضافة الشهادة" : "Add Certificate"}</span>
          </button>
        </div>

        {/* Dynamic Job Questions */}
        {(job?.questions?.length > 0 || job?.multiple_choices?.length > 0 || job?.multiple_question_multi?.length > 0) && (
          <div className="pt-4 space-y-4">
            <FormTitle
              local={local}
              text={local === "ar" ? "أسئلة الوظيفة" : "Job Questions"}
            />

            {/* Simple Text Questions */}
            {job?.questions?.map((question, index) => (
              <div key={index} className="space-y-1.5">
                <label className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${local === "ar" ? "text-right" : "text-left"}`}>
                  {question.text}
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 transition-all duration-200 text-slate-100 placeholder:text-slate-500 ${
                    local === "ar" ? "text-right" : "text-left"
                  }`}
                  onChange={(event) => handleFormChange(event, question.text)}
                  placeholder={local === "ar" ? "أدخل الإجابة..." : "Enter your answer..."}
                />
              </div>
            ))}

            {/* Multiple Choice Single Questions */}
            {job?.multiple_choices?.map((question, index) => (
              <div key={index} className="space-y-1.5">
                <label className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${local === "ar" ? "text-right" : "text-left"}`}>
                  {question.text}
                </label>
                <select
                  onChange={(event) => handleFormChange(event, question.text)}
                  className={`w-full bg-slate-950/80 border border-slate-700/80 text-slate-100 text-sm font-arabicMedium px-4 py-3 rounded-xl outline-none cursor-pointer ${
                    local === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    {local === "ar" ? "-- اختر إجابة --" : "-- Select Option --"}
                  </option>
                  {question.choices?.map((itemValue, i) => (
                    <option key={i} value={itemValue.text} className="bg-slate-900 text-slate-100">
                      {itemValue.text}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Multiple Question Multi */}
            {job?.multiple_question_multi?.map((question, index1) => (
              <div key={index1} className="space-y-2 p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                <label className={`block text-xs sm:text-sm font-arabicBold font-bold text-red-400 ${local === "ar" ? "text-right" : "text-left"}`}>
                  {question.text}
                </label>
                {question?.fields?.map((field, i2) => (
                  <div key={i2} className="space-y-1.5 pt-2">
                    <label className={`block text-xs font-semibold text-slate-300 ${local === "ar" ? "text-right" : "text-left"}`}>
                      {field.text}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {field?.choices?.map((choice, i) => (
                        <label
                          key={i}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs cursor-pointer hover:border-red-500/50"
                        >
                          <input
                            type="radio"
                            id={i}
                            name={field.text}
                            value={choice.text}
                            onChange={(event) => handleFormChange(event, field.text)}
                            className="w-3.5 h-3.5 accent-red-600 focus:ring-red-500 bg-slate-900 border-slate-700 cursor-pointer"
                          />
                          <span>{choice.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Validation Error Message */}
        {message && (
          <div
            className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm p-3.5 rounded-xl text-center font-arabicMedium shadow-sm"
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Submit Application Button */}
        <div className="pt-4">
          <Button type="submit" text={local === "ar" ? "إرسال طلب التوظيف" : "Submit Application"} />
        </div>
      </div>
    </form>
  );
}
