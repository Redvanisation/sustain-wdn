import React, { useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Checkbox from './Checkbox';
import { baseUrl, notify } from '../helpers';

const PathwaysSurvey = () => {
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [supportTypes, setSupportTypes] = useState([]);
  const [workBest, setWorkBest] = useState([]);
  const [peopleSee, setPeopleSee] = useState([]);

  const formRef = useRef(null);
  const history = useHistory();
  
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('auth');

  useLayoutEffect(() => {
    if (!currentUser) {
      history.push('/auth');
    }
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);
    if(subjects.length > 0) data.append('fav_subjects', subjects);
    if(activities.length > 0) data.append('fav_activities',activities);
    if(softSkills.length > 0) data.append('soft_skills',softSkills);
    if(supportTypes.length > 0) data.append('support_types',supportTypes);

    axios({
      method: 'put',
      url: `${baseUrl}/api/v1/users/${currentUser.user_id}`,
      data: data,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // formRef.current.reset();
          localStorage.setItem('user-answered', JSON.stringify(res.data));
          history.push(`/pathways`);
        }
      })
      .catch(() => notify('There has been an error!'));
  }

  return (
    <section className="form-section container">
      <h2 className="title is-2 is-centered">Sustainability Survey</h2>
      <h3 className="subtitle is-4 is-centered">Fill up the servey to discover the pathways that suit you</h3>
      
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        
        <div className="control">
          <label className="radio title is-6">
            What is your highest level of education you plan to complete??
          </label><br />
          <label className="radio">
            <input type="radio" name="education_level" value="Middle School" required />
            &nbsp;Middle School
          </label><br />
          <label className="radio">
            <input type="radio" name="education_level" value="High School" />
            &nbsp;High School
          </label><br />
          <label className="radio">
            <input type="radio" name="education_level" value="College" />
            &nbsp;Bachelor’s Degree
          </label><br />
          <label className="radio">
            <input type="radio" name="education_level" value="College" />
            &nbsp;Master’s Degree
          </label><br />
          <label className="radio">
            <input type="radio" name="education_level" value="Graduate School" />
            &nbsp;Doctorate Degrees
          </label>
        </div><br />

        <div className="field">
          <label className="radio title is-6">
            What is your favorite subject in school?
          </label><br />
          <div className="control checkbox-container">

            <div className="checkbox-group" >
              <Checkbox value="English" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Foreign Language" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Algebra" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Geometry" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Calculus" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Biology" name="fav_subjects" arr={subjects} setArr={setSubjects} />
            </div>

            <div className="checkbox-group" >
              <Checkbox value="Chemistry" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Physics" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Art" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Music" name="fav_subjects" arr={subjects} setArr={setSubjects} />
              <Checkbox value="Environmental Science" name="fav_subjects" arr={subjects} setArr={setSubjects} />
            </div>
          </div>
        </div><br />

        <div className="select is-multiple">
          <label className="radio title is-6">
            What are your favorite extracurricular activities?
          </label><br />
          <div className="control checkbox-container">

            <div className="checkbox-group" >
              <Checkbox value="Sports and Athletics" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Multicultural Activities" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Volunteer Work and Community Service" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Media: School Newspaper, Television, Radio, Yearb​ook" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Student Government" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Event Planning Committees" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Clubs" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Causes and Activism" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Arts" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Computer Activities" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Travelling" name="fav_activities" arr={activities} setArr={setActivities} />
              <Checkbox value="Leadership" name="fav_activities" arr={activities} setArr={setActivities} />
            </div>

          </div>
        </div><br />
        
        <br />

        <div className="select is-multiple">
          <label className="radio title is-6">
            Which of the following traits do you possess?
          </label><br />
          <div className="checkbox-group" >
            <Checkbox value="Critical thinking" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Teamwork" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Adaptability" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Time management" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Interpersonal skills" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Problem Solving and​ Resourcefulness" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Technologically skilled" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Negotiation" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Public Speaking" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Leadership" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Attention to Detail" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Organization" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Perseverance and Motivation" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
            <Checkbox value="Analytical Skills" name="soft_skills" arr={softSkills} setArr={setSoftSkills} />
          </div>
        </div><br />

        <br />

        <div className="select is-multiple">
          <label className="radio title is-6">
            What kind of support do you need?
          </label><br />
          <div className="checkbox-group" >
            <Checkbox value="Scholarships" name="support_types" arr={supportTypes} setArr={setSupportTypes} />
            <Checkbox value="Paid Internships" name="support_types" arr={supportTypes} setArr={setSupportTypes} />
            <Checkbox value="Work Study Opportunities" name="support_types" arr={supportTypes} setArr={setSupportTypes} />
            <Checkbox value="Loans" name="support_types" arr={supportTypes} setArr={setSupportTypes} />
            <Checkbox value="Transportation" name="support_types" arr={supportTypes} setArr={setSupportTypes} />
            <Checkbox value="Other Financial Support" name="support_types" arr={supportTypes} setArr={setSupportTypes} />
          </div>
        </div><br />

        <br />

        <div className="select is-multiple">
          <label className="radio title is-6">
            I work best when I am:
          </label><br />
          <div className="checkbox-group" >
            <Checkbox value="Given very clear guidelines" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Presenting my projects" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Working in groups with discussion" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Building things and/or repairing them" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Exploring a subject from different points of view" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Directing activities and people" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Responsible for organizing an activity and planning" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Working with information" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Working with people" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Working with things" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Working on solving problems" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Working under the supervision of someone else" name="work_best" arr={workBest} setArr={setWorkBest} />
            <Checkbox value="Leading a team to accomplish a goal" name="work_best" arr={workBest} setArr={setWorkBest} />
          </div>
        </div><br />

        <br />


        <div className="select is-multiple">
          <label className="radio title is-6">
            People see you as:
          </label><br />
          <div className="checkbox-group" >
            <Checkbox value="Level-headed" name="work_best" arr={peopleSee} setArr={setPeopleSee} />
            <Checkbox value="Logical" name="work_best" arr={peopleSee} setArr={setPeopleSee} />
            <Checkbox value="Careful" name="work_best" arr={peopleSee} setArr={setPeopleSee} />
            <Checkbox value="Risk-taker" name="work_best" arr={peopleSee} setArr={setPeopleSee} />
            <Checkbox value="Flexible" name="work_best" arr={peopleSee} setArr={setPeopleSee} />
          </div>
        </div><br />

        <br />

        <div className="field">
          <label className="label">
            How eager are you to get a Blue Job to rebuild the planet?
          </label><br />
          <div className="control">
            <div className="select">
              <select name="eager_scale">
                <option  value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div><br />

      <div className="field is-grouped">
        <div className="control is-centered">
          <button className="button is-link">Submit</button>
        </div>
      </div>
    </form>

  </section>
  );
};

export default PathwaysSurvey;
