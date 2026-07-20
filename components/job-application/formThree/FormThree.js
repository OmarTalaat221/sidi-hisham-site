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
    <form onSubmit={onSubmit}>
      <StepsProgress stepNumber={3} />
      <div className="md:w-[40%] flex flex-col mx-5  md:mx-[30%]  mb-5 justify-center space-x-2 ">
        <FormTitle
          local={local}
          text={local === "ar" ? "الشهادات " : "Certificates"}
        />
        <div className="flex mx-3">
          <div
            className={`flex  flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              local={local}
              name="name"
              label={local === "ar" ? "الشهادة" : "Certificate"}
              value={certificates.name}
              handleChange={handleCertificateChange}
              placeholder="الشهادة"
              inputType="text"
            />
          </div>
          <div
            className={`flex mx-3 flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              local={local}
              label={
                local === "ar" ? "مصدر الشهادة" : "Source of the certificate"
              }
              name="src"
              value={certificates.src}
              handleChange={handleCertificateChange}
              placeholder="مصدر الشهادة"
              inputType="text"
            />
          </div>
        </div>
        <div className="flex">
          <div
            className={`flex flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              local={local}
              label={local === "ar" ? "مدة الدراسة" : "Study duration"}
              name="duration_study"
              value={certificates.duration_study}
              handleChange={handleCertificateChange}
              placeholder="10"
              inputType="number"
            />
          </div>
          <div
            className={`flex mx-3  flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              local={local}
              label={local === "ar" ? "التخصص" : "Specialty"}
              value={certificates.field}
              name="field"
              handleChange={handleCertificateChange}
              placeholder="التخصص"
              inputType="text"
            />
          </div>
        </div>{" "}
        <div className="flex">
          <div
            className={`flex flex-[50%] pr-3 ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className="rounded-md font-arabicMedium 
  cursor-pointer text-sm w-[80%] mx-[10%] mt-7  h-5 py-5 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-6 bg-[#007530]"
              onClick={addCertificate}
            >
              {local === "ar" ? "اضافة الشهادة" : "Add certificate"}
            </div>
          </div>
          <div
            className={`flex flex-[50%] pr-3 ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              local={local}
              label={local === "ar" ? "سنة التخرج" : "Graduation Year"}
              name="graduate_year"
              value={certificates.graduate_year}
              handleChange={handleCertificateChange}
              placeholder="سنة التخرج"
              inputType="date"
            />
          </div>
        </div>
        <FormTitle
          local={local}
          text={local === "ar" ? "الاسئلة " : "Questions"}
        />
        <div className="px-3 space-y-2">
          {job?.questions.map((question, index) => (
            <div key={index}>
              <label className="block my-2 tracking-tight text-end text-[13px] font-medium text-[#007530] ">
                {question.text}
              </label>
              <input
                type="text"
                // name="answer"
                className=" text-end rounded-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
                onChange={(event) => handleFormChange(event, question.text)}
                // value={question.answer}
              />
            </div>
          ))}
          {job?.multiple_choices.map((question, index) => (
            <div key={index}>
              <label className="block mb-2 tracking-tight text-end text-[13px] font-medium text-[#007530] ">
                {question.text}
              </label>
              <select
                // name={name}
                // value={value}
                onChange={(event) => handleFormChange(event, question.text)}
                className="rounded-none text-end px-6  rounded-l-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 appearance-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
              >
                {/* <option>Select an option</option> */}
                {question.choices?.map((itemValue, index) => {
                  return (
                    <option
                      key={index}
                      // value={itemValue.text}
                      className="font-medium"
                    >
                      {itemValue.text}
                    </option>
                  );
                })}
              </select>
            </div>
          ))}
          {job?.multiple_question_multi.map((question, index1) => (
            <div key={index1}>
              <label className="block mb-2 tracking-tight text-end text-[13px] font-medium text-[#007530] ">
                {question.text}
              </label>
              {question?.fields.map((field, i2) => (
                <div key={i2} className="  text-end">
                  {" "}
                  <label className="text-[14px]">{field.text}</label>
                  {field?.choices.map((choice, i) => {
                    return (
                      <div
                        className="flex space-x-1 justify-end text-[14px]"
                        key={i}
                      >
                        <label>{choice.text}</label>
                        <input
                          type="radio"
                          id={i}
                          name={field.text}
                          value={choice.text}
                          onChange={(event) => {
                            handleFormChange(event, field.text);
                            console.log(
                              radioanswers[field.text] === choice.text
                            );
                          }}
                          // checked={radioanswers[field.text] === choice.text}
                          className="w-4 h-4 mt-[5px]  accent-red-700 bg-gray-100 border-gray-300 focus:ring-red-500 "
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        {message && (
          <div
            className="text-red-600 my-2 flex justify-center items-center"
            role="alert"
          >
            {message}
          </div>
        )}
        <div className="my-2">
          <button
            type="submit"
            className="rounded-md font-arabicMedium
  cursor-pointer text-sm w-full my-4  h-6 py-6 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-6 bg-[#007530]"
            // onClick={() => router.push("/job-application/jobSubmited")}
          >
            {local === "ar" ? " ارسل الطلب " : "Post job application"}
          </button>
        </div>
      </div>
    </form>
  );
}
