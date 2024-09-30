import React, { Component } from "react";
import imgadv from "../images/academic.png";

// AddMemberForm Component
const AddMemberForm = ({ formData, handleInputChange, handleSubmit }) => (
  <div className="my-10 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-bold mb-4">Add New Member</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleInputChange}
        placeholder="Position"
        className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300">
        Add Member
      </button>
    </form>
  </div>
);

// EditMemberForm Component
const EditMemberForm = ({ formData, handleInputChange, handleSubmit }) => (
  <div className="my-10 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-bold mb-4">Edit Member</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleInputChange}
        placeholder="Position"
        className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300">
        Update Member
      </button>
    </form>
  </div>
);

export class JECadvisoryBoard extends Component {
  state = {
    advisoryMemberData: [], // Initially empty, to be filled by data from server
    formData: {
      id: '',
      img: '',
      name: '',
      position: '',
    },
    isEditing: false,
    showForm: false, // New state property to control form visibility
  };

  componentDidMount() {
    // Fetch data from the server when component mounts
    fetch("https://api.example.com/advisory-members") // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        this.setState({ advisoryMemberData: data });
      })
      .catch((error) => console.error("Error fetching advisory members:", error));
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData, advisoryMemberData, isEditing } = this.state;

    if (isEditing) {
      this.setState({
        advisoryMemberData: advisoryMemberData.map((member) =>
          member.id === formData.id ? { ...formData } : member
        ),
        isEditing: false,
        formData: { id: '', img: '', name: '', position: '' },
        showForm: false, // Hide form after submit
      });
    } else {
      this.setState((prevState) => ({
        advisoryMemberData: [
          ...prevState.advisoryMemberData,
          { ...formData, id: prevState.advisoryMemberData.length + 1 },
        ],
        formData: { id: '', img: '', name: '', position: '' },
        showForm: false, // Hide form after submit
      }));
    }
  };

  handleEditClick = (member) => {
    this.setState({
      formData: { ...member },
      isEditing: true,
      showForm: true, // Show form when Edit is clicked
    });
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      advisoryMemberData: prevState.advisoryMemberData.filter((member) => member.id !== id),
    }));
  };

  toggleFormVisibility = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm, // Toggle form visibility when Edit button is clicked
    }));
  };

  render() {
    const { advisoryMemberData, isEditing, formData, showForm } = this.state;

    return (
      <div className="container mx-auto my-10 p-4 md:p-8 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl">
        <h1 className="text-[50px] my-5 text-red-600 text-center font-bold transition-transform duration-500 hover:scale-105" style={{ fontFamily: "'Merriweather', serif" }}>
          Advisory Board
        </h1>

        {/* Render Add or Edit Form based on showForm state */}
        {showForm && (
          isEditing ? (
            <EditMemberForm 
              formData={formData}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
            />
          ) : (
            <AddMemberForm 
              formData={formData}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
            />
          )
        )}

        {/* Toggle Button to Show/Hide Form */}
        <div className="text-center my-4">
          <button 
            onClick={this.toggleFormVisibility}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            {showForm ? "Hide Form" : "Edit Members"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-800">
              The Janakpur Engineering College Advisory Board is a prestigious group of industry experts who provide valuable guidance and support to our institution. Comprised of leading professionals from a range of fields, the Advisory Board is committed to helping JEC maintain its position as the nation's premier engineering program.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 mt-4">
              Through their expertise and insights, the Advisory Board helps JEC to develop innovative academic programs and research initiatives that meet the evolving needs of society. By working closely with the principal, faculty, and students, the Board helps to identify new opportunities and partnerships that will enable JEC to continue to provide the highest standard of education to our students.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 mt-4">
              At JEC, we are grateful for the contributions of our Advisory Board members, who help us to achieve our mission of preparing the next generation of engineering leaders. Through their dedication and expertise, our Advisory Board members play a vital role in ensuring that JEC remains at the forefront of engineering education and research.
            </p>
          </div>
          <img
            src={imgadv}
            className="mt-6 md:mt-0 md:ml-6 h-[250px] w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105"
            alt="Advisory Board"
          />
        </div>

        {/* Cards for the advisory members */}
        <div className="advisory-container my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryMemberData.map((member) => (
              <div
                key={member.id}
                className="card border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 bg-white"
              >
                <div className="flex justify-center bg-gray-100 p-4">
                  <img
                    src={member.img}
                    className="w-[250px] h-[250px] object-cover rounded-full border-4 border-blue-500 transition-transform duration-300 hover:scale-110"
                    alt={member.name}
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h5 className="text-[24px] text-blue-600 font-semibold" style={{ fontFamily: "'Merriweather', serif" }}>
                    {member.name}
                  </h5>
                  <p className="text-gray-600 font-medium">{member.position}</p>
                  
                  {/* Show Edit and Delete buttons only if showForm is true */}
                  {showForm && (
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => this.handleEditClick(member)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDelete(member.id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-10 p-4 bg-gray-200 rounded-lg text-center">
          <p className="text-gray-700 font-medium">© 2024 Janakpur Engineering College. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default JECadvisoryBoard;

{/* />
<input
type="text"
name="position"
value={formData.position}
onChange={handleInputChange}
placeholder="Position"
className="border p-2 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
required
/>
<button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300">
Update Member
</button>
</form>
</div>
);

export class JECadvisoryBoard extends Component {
state = {
advisoryMemberData: [], // Initially empty, to be filled by data from server
formData: {
id: '',
img: '',
name: '',
position: '',
},
isEditing: false,
showForm: false, // New state property to control form visibility
};

componentDidMount() {
// Fetch data from the server when component mounts
fetch("https://api.example.com/advisory-members") // Replace with your actual API URL
.then((response) => response.json())
.then((data) => {
this.setState({ advisoryMemberData: data });
})
.catch((error) => console.error("Error fetching advisory members:", error));
}

handleInputChange = (e) => {
const { name, value } = e.target;
this.setState((prevState) => ({
formData: {
...prevState.formData,
[name]: value,
},
}));
};

handleSubmit = (e) => {
e.preventDefault();
const { formData, advisoryMemberData, isEditing } = this.state;

if (isEditing) {
this.setState({
advisoryMemberData: advisoryMemberData.map((member) =>
  member.id === formData.id ? { ...formData } : member
),
isEditing: false,
formData: { id: '', img: '', name: '', position: '' },
showForm: false, // Hide form after submit
});
} else {
this.setState((prevState) => ({
advisoryMemberData: [
  ...prevState.advisoryMemberData,
  { ...formData, id: prevState.advisoryMemberData.length + 1 },
],
formData: { id: '', img: '', name: '', position: '' },
showForm: false, // Hide form after submit
}));
}
};

handleEditClick = (member) => {
this.setState({
formData: { ...member },
isEditing: true,
showForm: true, // Show form when Edit is clicked
});
};

handleDelete = (id) => {
this.setState((prevState) => ({
advisoryMemberData: prevState.advisoryMemberData.filter((member) => member.id !== id),
}));
};

toggleFormVisibility = () => {
this.setState((prevState) => ({
showForm: !prevState.showForm, // Toggle form visibility when Edit button is clicked
}));
};

render() {
const { advisoryMemberData, isEditing, formData, showForm } = this.state;

return (
<div className="container mx-auto my-10 p-4 md:p-8 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl">
<h1 className="text-[50px] my-5 text-red-600 text-center font-bold transition-transform duration-500 hover:scale-105" style={{ fontFamily: "'Merriweather', serif" }}>
  Advisory Board
</h1>

{/* Render Add or Edit Form based on showForm state */}
