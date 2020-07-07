import React,{useState,createContext} from 'react';

export const AddPointByModeratorContext = createContext({})

const AddPointByModeratorWrap = (props) => {

  const [point,setPoint] = useState({});

  return (
    <AddPointByModeratorContext.Provider value={{point, setPoint }}>
      {props.children}
    </AddPointByModeratorContext.Provider>
  )
};

export default AddPointByModeratorWrap;
