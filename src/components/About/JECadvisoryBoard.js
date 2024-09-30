import React, { Component } from "react";
import imgadv from "../images/academic.png";
// AddMemberForm Component
const AddMemberForm = ({ formData, handleInputChange, handleFileChange, handleSubmit }) => (
  <div className="p-6 my-10 bg-white rounded-lg shadow-lg">
    <h2 className="mb-4 text-xl font-bold">Add New Member</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="img"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleInputChange}
        placeholder="Position"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="p-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500">
        Add Member
      </button>
    </form>
  </div>
);

// EditMemberForm Component
const EditMemberForm = ({ formData, handleInputChange, handleFileChange, handleSubmit }) => (
  <div className="p-6 my-10 bg-white rounded-lg shadow-lg">
    <h2 className="mb-4 text-xl font-bold">Edit Member</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="img"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleInputChange}
        placeholder="Position"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="p-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500">
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
    showForm: false, // State to control form visibility
    currentlyEditingId: null, // State to track the member being edited
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

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            img: reader.result, // Set the image URL from file
          },
        }));
      };
      reader.readAsDataURL(file); // Convert the file to a base64-encoded URL
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData, advisoryMemberData, isEditing, currentlyEditingId } = this.state;

    if (isEditing && currentlyEditingId !== null) {
      // Edit the existing member
      this.setState({
        advisoryMemberData: advisoryMemberData.map((member) =>
          member.id === currentlyEditingId ? { ...formData } : member
        ),
        isEditing: false,
        formData: { id: '', img: '', name: '', position: '' }, // Clear form
        showForm: false, // Close form after submitting
        currentlyEditingId: null,
      });
    } else {
      // Add a new member
      this.setState((prevState) => ({
        advisoryMemberData: [
          ...prevState.advisoryMemberData,
          { ...formData, id: prevState.advisoryMemberData.length + 1 },
        ],
        formData: { id: '', img: '', name: '', position: '' }, // Clear form
        showForm: false, // Close form after submitting
      }));
    }
  };

  handleEditClick = (member) => {
    this.setState({
      formData: { ...member },
      isEditing: true,
      currentlyEditingId: member.id, // Track the member being edited
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
      showForm: !prevState.showForm, // Toggle form visibility
      isEditing: false, // Reset editing mode when toggling the form
      formData: { id: '', img: '', name: '', position: '' }, // Clear form when toggling
    }));
  };

  render() {
    const { advisoryMemberData, isEditing, formData, showForm, currentlyEditingId } = this.state;

    return (
      <div className="container p-4 mx-auto my-10 rounded-lg shadow-xl md:p-8 bg-gradient-to-br from-white to-gray-100">
        <h1 className="text-[50px] my-5 text-red-600 text-center font-bold transition-transform duration-500 hover:scale-105" style={{ fontFamily: "'Merriweather', serif" }}>
          Advisory Board
        </h1>

        {/* Render Add or Edit Form based on showForm state */}
        {showForm && (
          isEditing ? (
            <EditMemberForm 
              formData={formData}
              handleInputChange={this.handleInputChange}
              handleFileChange={this.handleFileChange}
              handleSubmit={this.handleSubmit}
            />
          ) : (
            <AddMemberForm 
              formData={formData}
              handleInputChange={this.handleInputChange}
              handleFileChange={this.handleFileChange}
              handleSubmit={this.handleSubmit}
            />
          )
        )}

        {/* Toggle Button to Show/Hide Form */}
        <div className="flex flex-col items-center justify-between mt-8 md:flex-row">
        <div className="md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-800">
              The Janakpur Engineering College Advisory Board is a prestigious group of industry experts who provide valuable guidance and support to our institution. Comprised of leading professionals from a range of fields, the Advisory Board is committed to helping JEC maintain its position as the nation's premier engineering program.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              Through their expertise and insights, the Advisory Board helps JEC to develop innovative academic programs and research initiatives that meet the evolving needs of society. By working closely with the principal, faculty, and students, the Board helps to identify new opportunities and partnerships that will enable JEC to continue to provide the highest standard of education to our students.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              At JEC, we are grateful for the contributions of our Advisory Board members, who help us to achieve our mission of preparing the next generation of engineering leaders. Through their dedication and expertise, our Advisory Board members play a vital role in ensuring that JEC remains at the forefront of engineering education and research.
            </p>
          </div>
          <img
            src={imgadv}
            className="mt-6 md:mt-0 md:ml-6 h-[250px] w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105"
            alt="Advisory Board"
          />
        </div>
        <div className="my-4 text-center">
          <button 
            onClick={this.toggleFormVisibility}
            className="p-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            {showForm ? "Hide Form" : "Edit Members"}
          </button>
        </div>

        {/* Cards for the advisory members */}
        <div className="my-10 advisory-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {advisoryMemberData.map((member) => (
              <div
                key={member.id}
                className="overflow-hidden transition-shadow duration-300 transform bg-white border border-gray-200 rounded-lg shadow-lg card hover:shadow-2xl hover:scale-105"
              >
                <div className="flex justify-center p-4 bg-gray-100">
                  <img
                    src={member.img}
                    className="w-[250px] h-[250px] object-cover rounded-full border-4 border-blue-500 transition-transform duration-300 hover:scale-110"
                    alt={member.name}
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h5 className="text-[24px] text-blue-700 font-bold mb-2">{member.name}</h5>
                  <p className="text-[18px] mb-4 text-gray-700">{member.position}</p>

                  {/* Hide Edit and Delete buttons while editing */}
                  {showForm && (
                  !isEditing ? (
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => this.handleEditClick(member)}
                        className="px-4 py-2 text-white transition duration-300 bg-yellow-500 rounded hover:bg-yellow-400"
                      >
                        Edit
                      </button>
                      <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete ?")) {
                              this.handleDelete(member.id);
                            }
                          }}
                      
                        className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default JECadvisoryBoard;