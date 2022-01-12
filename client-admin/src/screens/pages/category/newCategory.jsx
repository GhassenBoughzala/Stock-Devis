import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import useForm from "../useForm";
import {addCat, updateCat} from "../../../redux/reducers/catReducer";

const initialFieldValues = { name:"",}

const Add = ({ ...props }) => {
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.List.find((p) => p._id === props.currentId),
      });
      setErrors({});
    }

  }, [props.currentId]);

  const validate = () => {
    let temp = {...errors};
    temp.name = values.name ? "" : "This field is required.";   
    setErrors({...temp,});
    return Object.values(temp).every((p) => p === "");
  };

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      window.location.reload();
      resetForm();
    };
    if (validate()) {
      if (props.currentId === 0){

          props.create(values, onSuccess);
          console.log(props)
          toast.success('Ajouté avec succès');
          resetForm();
         
       
      } else {
        toast.info('Mis à jour avec succés');
        props.update(props.currentId, values, onSuccess);
        
      }   

    }else { toast.warn('Warning ! '); }
  };

  const reset = (e) => {
    resetForm();
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Ajouter ou Editer  
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Titre de categorie
                  </label>
                  <textarea
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
           
            </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                
                <div className="relative w-full mb-3">
                  
                  <button
                    type="submit"
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Confirmer
                  </button>
                </div>
                </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    type="submit"
                    onClick={() => reset()}
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>

  );
};



const mapStateToProps = (state) => ({
    List: state.catReducer.categories,
});

const mapActionToProps = {
  create: addCat,
  update: updateCat,
};

export default connect(mapStateToProps, mapActionToProps)(Add);
