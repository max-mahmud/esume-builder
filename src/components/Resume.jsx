import React, { useEffect, useState } from "react";
import {
  AiOutlinePaperClip,
  AiFillCalendar,
  AiTwotoneMail,
  AiFillPhone,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

import { BiMapPin } from "react-icons/bi";

const Resume = React.forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const activeColor = props.activeColor;

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        style={{ color: activeColor }}
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${info.workExp?.sectionTitle ? "" : "hidden"}`}
      >
        <div className="">{info.workExp.sectionTitle}</div>
        <div className="">
          {info.workExp?.details?.map((item) => (
            <div className="" key={item.title}>
              {item.title ? <p className="">{item.title}</p> : <span />}
              {item.companyName ? <p className="">{item.companyName}</p> : <span />}
              {item.certificationLink ? (
                <a className="" href={item.certificationLink}>
                  <AiOutlinePaperClip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className="">
                  <AiFillCalendar /> {getFormattedDate(item.startDate)}-{getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.location ? (
                <p className="">
                  <BiMapPin /> Remote
                </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className="">
                  {item.points?.map((elem, index) => (
                    <li className="" key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        style={{ color: activeColor }}
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={` ${info.project?.sectionTitle ? "" : "hidden"}`}
      >
        <div className="">{info.project.sectionTitle}</div>
        <div className="">
          {info.project?.details?.map((item) => (
            <div className="" key={item}>
              {item.title ? <p className="">{item.title}</p> : <span />}
              {item.link ? (
                <a className="" href={item.link}>
                  <AiOutlinePaperClip />
                  {item.link}
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className="" href={item.github}>
                  <AiFillGithub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {item.overview ? <p className="">{item.overview} </p> : <span />}
              {item.points?.length > 0 ? (
                <ul className="">
                  {item.points?.map((elem, index) => (
                    <li className="" key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={` ${info.education?.sectionTitle ? "" : styles.hidden}`}
      >
        <div className="">{info.education?.sectionTitle}</div>
        <div className="">
          {info.education?.details?.map((item) => (
            <div className="" key={item}>
              {item.title ? <p className="">{item.title}</p> : <span />}
              {item.college ? <p className="">{item.college}</p> : <span />}
              {item.startDate && item.endDate ? (
                <div className="">
                  <AiFillCalendar /> {getFormattedDate(item.startDate)} -{getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => seTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
        className={` ${info.achievement?.sectionTitle ? "" : "hidden"}`}
      >
        <div className="">{info.achievement?.sectionTitle}</div>
        <div className="">
          {info.achievement?.points?.length > 0 ? (
            <ul className="">
              {info.achievement?.points?.map((elem, index) => (
                <li className="" key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={` ${info.summary?.sectionTitle ? "" : "hidden"}`}
      >
        <div className="">{info.summary?.sectionTitle}</div>
        <div className="">
          <p className="">{info.summary?.detail}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => seTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
        className={` ${info.other?.sectionTitle ? "" : "hidden"}`}
      >
        <div className="">{info.other?.sectionTitle}</div>
        <div className="">
          <p className="">{info?.other?.detail}</p>
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] = tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.project, sections.education, sections.summary],
      [sections.workExp, sections.achievement, sections.other],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  //   useEffect(() => {
  //     const container = containerRef.current;
  //     if (!props.activeColor || !container) return;

  //     container.style.setProperty("--color", props.activeColor);
  //   }, [props.activeColor]);
  // props.componentRef
  return (
    <div>
      <div ref={ref} className="">
        <div className="header">
          <p className="heading">{info.basicInfo?.detail?.name}</p>
          <p className={"subHeading"}>{info.basicInfo?.detail?.title}</p>

          <div className={"links"}>
            {info.basicInfo?.detail?.email ? (
              <a className="" type="email">
                <AiTwotoneMail /> {info.basicInfo?.detail?.email}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.phone ? (
              <a className="">
                <AiFillPhone /> {info.basicInfo?.detail?.phone}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.linkedin ? (
              <a className="">
                <AiFillLinkedin /> {info.basicInfo?.detail?.linkedin}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.github ? (
              <a className="">
                <AiFillGithub /> {info.basicInfo?.detail?.github}
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>

        <div>
          <div>{columns[0].map((item) => sectionDiv[item])}</div>
          <div>{columns[1].map((item) => sectionDiv[item])}</div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
