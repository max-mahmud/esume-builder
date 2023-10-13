import React, { useState, useEffect, useRef } from "react";
import { BsDownload } from "react-icons/bs";
import ReactToPrint from "react-to-print";
import Editor from "./Editor";
import Resume from "./Resume";

const Body = () => {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];

  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  useEffect(() => {}, [resumeInformation]);
  return (
    <div className="my-6 container mx-auto">
      <h4 className="text-center text-4xl font-medium">Resume Builder</h4>
      <div className=" mt-3  flex justify-between">
        <div>
          {colors.map((c, i) => (
            <span
              onClick={() => setActiveColor(c)}
              key={i}
              style={{ background: c }}
              className="inline-block w-8 h-8 rounded-full border border-orange-100 mx-2"
            ></span>
          ))}
        </div>
        <div>
          <ReactToPrint
            trigger={() => {
              return (
                <button className="px-5 py-2 flex justify-between text-white rounded-sm bg-blue-500">
                  Download <BsDownload />
                </button>
              );
            }}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <div>
        <Editor sections={sections} information={resumeInformation} setInformation={setResumeInformation} />
        <Resume
          ref={componentRef}
          information={resumeInformation}
          sections={sections}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
};

export default Body;
