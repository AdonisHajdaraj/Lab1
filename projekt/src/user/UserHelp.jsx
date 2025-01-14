import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../user/UserSidebar';

function UHelp() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Help Content */}
        <div className="col-md-9">
          <div className="container mt-5">
            <h1 className="text-center mb-4">Qendra e Ndihmës</h1>
            <div className="accordion" id="accordionExample">
              
              {/* Question 1 */}
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <p>Pyetja 1: Si të regjistrohem në platformë?</p>  
                      <p>Për të regjistruar, shkoni tek faqja e regjistrimit dhe plotësoni formën me të dhënat tuaja.</p>  
                    </button>
                  </h2>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    Përgjigja për pyetjen 1 këtu...
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <p>Pyetja 2: Si të ndryshoj fjalëkalimin tim?</p>  
                      <p>Për të ndryshuar fjalëkalimin, shkoni tek opsionet e llogarisë dhe zgjidhni opsionin "Ndrysho Fjalëkalimin".</p>  
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    Përgjigja për pyetjen 2 këtu...
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <p>Pyetja 3: A ka një aplikacion mobil për platformën?</p>  
                      <p>Per momentin nuk kemi por se shpejti do te jete</p>  
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                    Përgjigja për pyetjen 3 këtu...
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="card">
                <div className="card-header" id="headingFour">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      <p>Pyetja 4: Si behet rezervimi i dhomave?</p>  
                      <p>Per ti rezervuar dhomat shkoni tek faqja Rezervo dhe klikoni tek butoni rezervo</p>  
                    </button>
                  </h2>
                </div>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                  <div className="card-body">
                    Përgjigja për pyetjen 4 këtu...
                  </div>
                </div>
              </div>

            </div>

            {/* Link to Contact Us Page */}
            <div className="text-center mt-4">
              <Link to="/contactus" className="btn btn-primary">Klikoni këtu për të dërguar një pyetje të re</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UHelp;
