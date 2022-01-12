import React, { useEffect, Fragment } from "react";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import useForm from "../useForm";
import {getdetails} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou  } from "../../../redux/reducers/forReducer";

const initialFieldValues = {
  name:"",
  description: "",
  price : "",
  quantity: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: "",
}


const ProductDetails = ({ ...props }) => {

  useEffect(() => {
    props.All();
  }, []);

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.List.find((p) => p._id === props.currentId),
      });
      setErrors({});
    }

  }, [props.currentId]);

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
   
      if (props.currentId === 0){
          console.log(props)

      } else {
        toast.info('Mis à jour avec succés');
        props.Details(props.currentId, values);
        
      }   

  };


  return (
    <>
       <div className="widgetLg">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-m font-bold">
              Details
            </h6>
            <div className="widgetLgAmount">
              <div className="productListItem">
                  <img className="productListImg" src={values.photo} alt={values.photo} /> 
              </div>
            </div>
            
          </div>

   


  <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Catégorie: 
                  </label>
                  <select disabled name="category" 
                          onChange={handleInputChange}
                          value={values.category}
                          className=" block text-gray-700 text-xs font-bold mb-2 ">
                      <option value=""></option>
                      {props.ListCat.map((cat) => {
                        return ( 
                          <option value={cat._id}>{cat.name}</option>
                        );
                      })}
                  </select>  
                </div>
                
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <br></br>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                     Fournisseur:
                  </label>
                  <select disabled name="fournisseur" 
                          onChange={handleInputChange}
                          value={values.fournisseur} 
                          className=" block text-gray-700 text-xs font-bold mb-2 ">
                      <option value=""></option>
                      {props.ListFou.map((f) => {
                        return ( 
                          <option value={f._id}>{f.title}</option>
                        );
                      })}
                  </select>  
                </div>
              </div>
            </div>
</div>
    </>

  );
};

const mapStateToProps = (state) => ({
    List: state.productsReducer.products,
    ListCat: state.catReducer.categories,
    ListFou: state.forReducer.fournisseurs,
});

const mapActionToProps = {
  All: getAllCat,
  AllF: getAllFou,
  Details: getdetails,
};

export default connect(mapStateToProps, mapActionToProps)(ProductDetails);
