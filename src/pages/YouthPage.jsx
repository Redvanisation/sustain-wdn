import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { FiEdit, FiDownload } from 'react-icons/fi';

// import { UserContext } from '../providers/UsersProvider';
import UploadWorksheet from '../components/UploadWorksheet';
import { baseUrl } from '../helpers/';
import blueStar from '../assets/star-blue.png';
import greenStar from '../assets/star-green.png';
import orangeStar from '../assets/star-orange.png';

const YouthPage = (props) => {
  const [user, setUser] = useState({});
  const [facilitator, setFacilitator] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let [mounted, setMounted] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userPathways = JSON.parse(localStorage.getItem('user-fav-pathways'));
  // const userCtx = useContext(UserContext);
  const history = useHistory();
  // const fileRef = useRef(null)

  useLayoutEffect(() => {
    if (!(currentUser.role === 'user') && !(currentUser.role === 'facilitator')) {
      history.push('/auth');
    }
  });

  const getId = () => {
    if (currentUser.role === 'user') {
      return currentUser.user_id;
    } else {
      return props.match.params.id;
    }
  }

  const getFacilitatorId = () => {
    if (currentUser.role === 'user') {
      return currentUser.facilitator_id;
    } else {
      if (!props.location.user) {
        return false;
      }
      return props.location.user.facilitator_id;
    }
  }

  // console.log(props)
  const handleFileUpload = (e) => {
    e.preventDefault();

    const doc = e.target.files[0];
    if (!doc) return;
    
    if (doc.type === 'application/pdf') {
      const data = new FormData()
      data.append(e.target.name, e.target.files[0])
      
      // console.log(e.target.name)
      
      axios({
        method: 'put',
        url: `${baseUrl}api/v1/worksheets_upload/${getId()}`,
        data,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            // console.log(res.data);
            alert('Worksheet uploaded successfully');
          }
        })
        .catch(() => alert('Error uploading the worksheet'))
    }
  };


  useEffect(() => {
    if (mounted) {
      if (currentUser) { 
        const getUser = async () => {
          const response = await axios({
            method: 'get',
            url: `${baseUrl}api/v1/users/${getId()}`,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('auth')}`
            }
          });
  
          setUser(response.data);
          setIsLoading(false);
        }
  
        getUser();
      }
    }

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const possible = getFacilitatorId();

    if (mounted && possible) {
      if (currentUser) {
        const getFacilitator = async () => {
          const response = await axios({
            method: 'get',
            url: `${baseUrl}api/v1/facilitators/${getFacilitatorId()}`,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('auth')}`
            }
          });
  
          setFacilitator(response.data);
        }
  
        getFacilitator();
      }
    } else {
      history.push('/');
    }

    return () => setMounted(false);
  }, []);

  const assignFacilitator = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    e.target.reset();

    axios({
      method: 'put',
      url: `${baseUrl}api/v1/users/${getId()}`,
      data,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth')}`
      }
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          alert('Facilitator assigned successfully');
          history.push(`/facilitator/${currentUser.user_id}`);
        }
      })
      .catch(() => alert('There has been an error assigning the facilitator!'));
  }

  const setActivePathway = () => {
    if (user.active_pathway) {
      const act = userPathways.find(elem => elem.title === user.active_pathway);
      return [act.id, act.title];
    }
  }

  return (
    <main className="youth">
      {
        isLoading 
          ? <h2>Getting user...</h2>
          : (
            <>
            {/* {console.log(user)} */}
              <header className="youth__header title is-3 is-bold">
                <h3 className="youth__header--title">Welcome back, <span className="youth__header--username">{user.name}</span>!</h3>
              </header>
              
              <section className="youth__profile-section">
                {
                  currentUser.role === 'user' || currentUser.role === 'facilitator'
                    ? (
                      <Link to={{
                        pathname: "/edit/user",
                        user
                      }} className="youth__profile-section--edit-btn">Edit</Link>
                    )
                    : null
                }

                <div className="youth__profile-section--image-div">
                  <h3 className="youth__profile-section--title">{user.name}</h3>
                  <div className="youth__profile-section--image" style={{'content':`url(${user.image ? user.image.url : null})`}} />
                  <h3 className="youth__profile-section--title">Facilitator</h3>
                  <span className="youth__header--username">{facilitator.name}</span>
                  <div className="youth__profile-section--image-facilitator" style={{'content':`url(${facilitator.image ? facilitator.image.url : null})`}} />

                  {
                    currentUser && currentUser.admin
                      ? (
                        <form onSubmit={assignFacilitator}>
                          <div className="field has-addons">
                            <div className="control">
                              <input className="input" type="text" name="facilitator_id" placeholder="Code..." />
                            </div>
                            <div className="control">
                              <input type="submit" className="button is-info" value="Assign Facilitator" />
                            </div>
                          </div>
                        </form>
                      ) : null
                  }
                </div>

                <div className="youth__profile-section--bio-div">
                  <div className="youth__profile-section--bio-container">
                    <h3 className="youth__profile-section--title">Bio</h3>
                    <p className="youth__profile-section--bio-text">
                      {user.bio ? user.bio : 'Edit your profile to set up your bio'}
                    </p>
                  </div>

                  <div className="youth__profile-section--bottom-container">

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Greatest Assets</h3>
                      <p className="youth__profile-section--bio-text">
                        {user.greatest_assets ? user.greatest_assets : 'Edit your profile to set up your greatest assets'}
                      </p>
                    </div>

                    <div className="youth__profile-section--bottom-div">
                      <h3 className="youth__profile-section--title">Greatest Challenges</h3>
                      <p className="youth__profile-section--bio-text">
                        {user.greatest_challenges ? user.greatest_challenges : 'Edit your profile to set up your greatest challenges'}
                      </p>
                    </div>
                  </div>

                </div>
              </section>
              
              <section className="youth__dream-map">
                <h2 className="youth__titles title is-3">Dream Map</h2>

                <div className="youth__dream-map__container">

                  <div className="youth__dream-map__container--image-div">
                    <figure className="youth__dream-map__container--figure">
                      <img src={blueStar} alt="Dream map" className="youth__dream-map__container--image" />
                      <figcaption className="youth__dream-map__container--image-text text-blue">
                        {user.life_dream ? user.life_dream : 'Set your life dream!'}
                      </figcaption>
                    </figure>

                    <figure className="youth__dream-map__container--figure">
                      <img src={orangeStar} alt="Dream map" className="youth__dream-map__container--image" />
                      <figcaption className="youth__dream-map__container--image-text text-orange">
                        {user.community_dream ? user.community_dream : 'Set your dream for the community!'}
                      </figcaption>
                    </figure>

                    <figure className="youth__dream-map__container--figure">
                      <img src={greenStar} alt="Dream map" className="youth__dream-map__container--image" />
                      <figcaption className="youth__dream-map__container--image-text text-green">
                        {user.world_dream ? user.world_dream : 'Set your dream for the world!'}
                      </figcaption>
                    </figure>
                  </div>

                </div>

                {
                  currentUser.role === 'user' || currentUser.role === 'facilitator'
                    ? (
                      <Link to={{
                        pathname: "/dreammap/edit",
                        user
                      }} className="youth__dream-map--button">
                        {
                          (user.life_dream || user.community_dream || user.world_dream)
                            ? 'Update my dreams'
                            : 'Set my dreams'
                        }
                      </Link>
                    )
                    : null
                }
              </section>

              <section className="youth__worksheets">
                <h2 className="youth__titles title is-3">Worksheets</h2>

                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title title is-5">
                    Youth Bio Questions
                  </h3>

                  <div className="youth__worksheets--buttons-container">
                    <a href="/worksheets/1-Youth-Bio-Delegate-Questions.pdf" download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn">
                      <FiEdit />&nbsp;Worksheet
                    </a>
                    <UploadWorksheet name="bio_worksheet" method={handleFileUpload} user={currentUser} />
                    <a href={user.bio_worksheet ? user.bio_worksheet.url : '#'} download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn" disabled={user.bio_worksheet ? false : true}>
                     <FiDownload />&nbsp;Download
                    </a>
                  </div>                  
                </div>


                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title title is-5">Professtional Development</h3>
                  
                  <div className="youth__worksheets--buttons-container">
                    <a href="/worksheets/2-Professional-Worksheet.docx" download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn">
                      <FiEdit />&nbsp;Worksheet
                    </a>
                    <UploadWorksheet name="development_worksheet" method={handleFileUpload} user={currentUser} />
                    <a href={user.development_worksheet ? user.development_worksheet.url : '#'} download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn" disabled={user.development_worksheet ? false : true}>
                      <FiDownload />&nbsp;Download
                    </a>
                  </div>

                </div>

                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title title is-5">Sustainability in Action</h3>
                  
                  <div className="youth__worksheets--buttons-container">
                    <a href="/worksheets/3-YLS-Sustainability-In-Action-Worksheet-2020.pdf" download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn">
                      <FiEdit />&nbsp;Worksheet
                    </a>
                    <UploadWorksheet name="sustainability_worksheet" method={handleFileUpload} user={currentUser} />
                    <a href={user.sustainability_worksheet ? user.sustainability_worksheet.url : '#'} download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn" disabled={user.sustainability_worksheet ? false : true}>
                      <FiDownload />&nbsp;Download
                    </a>
                  </div>

                </div>


                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title title is-5">College Prep</h3>
                  
                  <div className="youth__worksheets--buttons-container">
                    <a href="/worksheets/4-college-prep-worksheet-2020.pdf" download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn">
                      <FiEdit />&nbsp;Worksheet
                    </a>
                    <UploadWorksheet name="college_prep_worksheet" method={handleFileUpload} user={currentUser} />
                    <a href={user.college_prep_worksheet ? user.college_prep_worksheet.url : '#'} download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn" disabled={user.college_prep_worksheet ? false : true}>
                      <FiDownload />&nbsp;Download
                    </a>
                  </div>
                </div>

                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title title is-5">5 years plan</h3>
                  
                  <div className="youth__worksheets--buttons-container">
                    <a href="/worksheets/5-Five-Year-Action-Plan.docx" download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn">
                      <FiEdit />&nbsp;Worksheet
                    </a>
                    <UploadWorksheet name="five_years_worksheet" method={handleFileUpload} user={currentUser} />
                    <a href={user.five_years_worksheet ? user.five_years_worksheet.url : '#'} download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn" disabled={user.five_years_worksheet ? false : true}>
                      <FiDownload />&nbsp;Download
                    </a>
                  </div>
                </div>

                <div className="youth__worksheets--worksheet-container">
                  <h3 className="youth__worksheets--worksheet-title title is-5">Performance Metrics</h3>
                  
                  <div className="youth__worksheets--buttons-container">
                    <a href="/worksheets/6-Performance-Metrics-2020-Fillable.pdf" download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn">
                      <FiEdit />&nbsp;Worksheet
                    </a>
                    <UploadWorksheet name="five_years_worksheet" method={handleFileUpload} user={currentUser} />
                    <a href={user.five_years_worksheet ? user.five_years_worksheet.url : '#'} download target="_blank" rel="noopener noreferrer" className="youth__worksheets--btn button btn" disabled={user.five_years_worksheet ? false : true}>
                      <FiDownload />&nbsp;Download
                    </a>
                  </div>
                </div>
              </section>

              {
                userPathways && user.active_pathway
                  ? (
                    <section className="youth__fav-pathways">
                      <div className="youth__fav-pathways--active-pathway">
                        <h2 className="title is-3 is-centered">Active Pathway</h2>
                        <Link to={`/pathway/${setActivePathway()[0]}`} 
                          className="pathway-record" 
                        >

                          <p className="pathway-record__id mb-1">
                            Pathway number: {setActivePathway()[0]}
                          </p>

                          <h3 className="pathway-record__title title is-4 mt-1">
                            {setActivePathway()[1]}
                          </h3>
                        </Link>

                      </div>
                    </section>
                  ) : <h3 className="subtitle is-3 is-bold is-centered text-light-blue">No Active Pathway yet</h3>
              }

              <section className="youth__sustainability">
                <h2 className="youth__titles title is-3">Sustainability</h2>

                <h3 className="youth__sustainability--title title is-4">SustainWDN Pathways Survey</h3>
                <p className="youth__sustainability--text">
                  When you sign up we use the information that you give us (interests, skills, etc.) to recommend potential career areas. When you select a career area to explore, we offer you a graphical pathway to achieve a job in that area, with actionable items, such as internships we can help you to apply for. You can even apply for the job if you are already qualified!
                </p>
                {
                  currentUser.role === 'user'
                    ? (
                      <Link to="/youth/survey" className="youth__sustainability--link">
                        Take the Survey!
                      </Link>
                    ) : null
                }
              </section>
            </>
          )
      }
    </main>
  );
};

export default YouthPage;
