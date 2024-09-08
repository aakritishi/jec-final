import React, { Component } from "react";
import imgadv from "../images/academic.png";
import img1 from "../images/bhim.jpg";
import img2 from "../images/shaligram.jpg";
import img3 from "../images/niroj.jpg";
import img4 from "../images/tapendra.jpg";
import img5 from "../images/ram.jpg";
import img6 from "../images/arun.jpg";
import img7 from "../images/rabindra.jpeg";

export class JECadvisoryBoard extends Component {
  render() {
    const advisorymemberdata = [
      {
        id: 1,
        img: img1,
        name: "P. ENG. BHIM UPADHYAYA",
        position: "FORMER SECRETARY, GOVERNMENT OF NEPAL",
      },
      {
        id: 2,
        img: img2,
        name: "ER. SHALIGRAM SINGH",
        position: "FORMER CHAIRMAN, NEPAL ENGINEERING COUNCIL",
      },
      {
        id: 3,
        img: img3,
        name: "ER. DR. NIROJ PANDEY",
        position: "FORMER REGISTRAR, NEPAL ENGINEERING COUNCIL",
      },
      {
        id: 4,
        img: img4,
        name: "ER. TAPENDRA BAHADUR KHADKA",
        position:
          "FORMER JOINT SECRETARY, DEPARTMENT OF URBAN DEVELOPMENT AND BUILDING CONSTRUCTION",
      },
      {
        id: 5,
        img: img5,
        name: "ER. RAM KUMAR SHRESTHA",
        position: "JOINT SECRETARY, GOVERNMENT OF NEPAL",
      },
      {
        id: 6,
        img: img6,
        name: "ER.ARUN RAJAURIA",
        position:
          "DGM at HIDCL Hydroelectricity Investment and DEVELOPMENT Company",
      },
      {
        id: 7,
        img: img7,
        name: "Er. Rabindra Jha",
        position: "BOARD MEMBER, NEPAL TELECOMMUNICATION AUTHORITY",
      },
    ];

    return (
      <div className="w-[90%] mx-auto">
        <h1
          className="text-[45px] my-5 text-red-500 flex justify-center items-center text-center"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          Advisiory Board
        </h1>
        <div className="mt-6 md:mt-10 text-justify">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <p>
                The Janakpur Engineering College Advisory Board is a prestigious
                group of industry experts who provide valuable guidance and
                support to our institution. Comprised of leading professionals
                from a range of fields, the Advisory Board is committed to
                helping JEC maintain its position as the nation's premier
                engineering program.
              </p>
              <br />
              <p>
                Through their expertise and insights, the Advisory Board helps
                JEC to develop innovative academic programs and research
                initiatives that meet the evolving needs of society. By working
                closely with the principal, faculty, and students, the Board
                helps to identify new opportunities and partnerships that will
                enable JEC to continue to provide the highest standard of
                education to our students.
              </p>
              <br />
              <p>
                At JEC, we are grateful for the contributions of our Advisory
                Board members, who help us to achieve our mission of preparing
                the next generation of engineering leaders. Through their
                dedication and expertise, our Advisory Board members play a
                vital role in ensuring that JEC remains at the forefront of
                engineering education and research.
              </p>
            </div>
            <img
              src={imgadv}
              className="mt-6 md:mt-0 md:ml-6 h-[200px] w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105"
              alt="Teachers"
            />
          </div>
        </div>
        {/* <div className='w-[94%] mx-auto text-xl font-[16px] leading-relaxed text-slate-700'>
            <p>
                The Janakpur Engineering College Advisory Board is a prestigious group of industry experts who provide valuable guidance and support to our institution. Comprised of leading professionals from a range of fields, the Advisory Board is committed to helping JEC maintain its position as the nation's premier engineering program.
            </p>
            <br />
            <p>
                Through their expertise and insights, the Advisory Board helps JEC to develop innovative academic programs and research initiatives that meet the evolving needs of society. By working closely with the principal, faculty, and students, the Board helps to identify new opportunities and partnerships that will enable JEC to continue to provide the highest standard of education to our students.
            </p>
            <br />
            <p>
                At JEC, we are grateful for the contributions of our Advisory Board members, who help us to achieve our mission of preparing the next generation of engineering leaders. Through their dedication and expertise, our Advisory Board members play a vital role in ensuring that JEC remains at the forefront of engineering education and research.
            </p>
        </div> */}

        {/* cards for the advisory member */}
        <div className="advisory-container my-5">
          <div className="row">
            {advisorymemberdata.map((advisorymember) => (
              <div
                key={advisorymember.id}
                className="col-12 col-md-6 col-lg-4 mb-4"
              >
                <div
                  className="card mx-auto"
                  style={{ width: "100%", padding: "10px" }}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={advisorymember.img}
                      className="card-img-top h-[300px] w-[300px] object-cover transition-transform duration-300 hover:scale-105"
                      alt={advisorymember.name}
                    />
                  </div>
                  <div className="card-body flex flex-col items-center justify-center">
                    <h5
                      className="card-title text-[24px] text-center text-blue-500"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      {advisorymember.name}
                    </h5>
                    <p className="text-center font-semibold">
                      {advisorymember.position}
                    </p>
                  </div>
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
