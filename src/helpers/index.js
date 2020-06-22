import { toast } from 'react-toastify';
import codingImg from '../assets/coding.jpg';
import nursingImg from '../assets/nursing.jpg';
import vetImg from '../assets/veterinarian.jpg';
import hrImg from '../assets/human-resources.jpg';
import managerImg from '../assets/project-manager.jpg';
import coordImg from '../assets/project-coordinator.jpg';


// export const baseUrl = 'https://sustain-wdn-api.herokuapp.com/';
export const baseUrl = 'http://localhost:3000/';


export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};


export const setBackgroundImg = (title) => {
  switch (title) {
    case 'Computer Science':
      return codingImg;
    case 'Nursing':
      return nursingImg;
    case 'Veterinarian':
      return vetImg;
    case 'Human Resources Manager':
      return hrImg;
    case 'Project Manager':
      return managerImg;
    case 'Project Coordinator':
      return coordImg;
    default:
      return null;
  };
};

toast.configure();
export const notify = (message) => toast.info(message, {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000
});

