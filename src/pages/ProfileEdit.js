import React, {Component} from 'react'
import Footer from '../components/Footer'

class ProfileEdit extends Component {
  render() {
    return(
      <section className="bg-gray200 pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <article className="card">
               
                <div className="card-body">
                  <h1 className="card-title display-4 text-center">
                    Edit Profile </h1>
                  
                  <hr/>
                  <form>
                    <div className="form-group">
                      <p>Project Name:</p>
                      <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                      <p>Project Type:</p>
                      <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                      <p>Description:</p>
                      <textarea className="form-control" ></textarea>
                    </div>
                    <div className="form-group">
                      <p>Period:</p>
                    <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                      <p>Deadline:</p>
                      <input className="form-control" type="date"/>
                    </div>
                    <div className="form-group">
                      <p>Salary:</p>
                      <input className="form-control" type="text"/>
                    </div>
                    <div className="form-group float-right p-t-15">
                      <button className="btn btn-md btn-light mr-3">Cancel</button>
                      <button type="submit" className="btn btn-md btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
              </article>
            </div>
          </div>
          <Footer />
        </div>
      </section>
    )
  }
}

export default ProfileEdit
