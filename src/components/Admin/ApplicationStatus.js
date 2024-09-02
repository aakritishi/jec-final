import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from './_component/Sidebar';

const ApplicationStatus = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Correct redirection to login page
      return;
    }

    axios.get('http://192.168.1.135:8000/api/application-forms/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error('Error fetching forms:', error);
      });
  }, [navigate]);

  const handleAccept = (formId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token is missing');
      navigate('/login');
      return;
    }
  
    axios.patch(`http://192.168.1.135:8000/api/application-forms/${formId}/`, 
      { action: 'accepted' }, // Sending the updated action in the request body
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(() => {
      setForms(forms.map(form => form.id === formId ? { ...form, action: 'accepted' } : form));
      window.location.reload();
    })
    .catch(error => {
      console.error('Error accepting form:', error);
    });
  };
  
  const handleDecline = (formId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token is missing');
      navigate('/login');
      return;
    }
  
    axios.patch(`http://192.168.1.135:8000/api/application-forms/${formId}/`, 
      { action: 'rejected' }, // Sending the updated action in the request body
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(() => {
      setForms(forms.map(form => form.id === formId ? { ...form, action: 'rejected' } : form));
      window.location.reload();
    })
    .catch(error => {
      console.error('Error declining form:', error);
    });
  };
  

  const viewDetail = (formId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token is missing');
      navigate('/login');
      return;
    }

    navigate('/printForm', {
      state: {
        formId,
        token,
      },
    });
  };

  return (
    <div className="ml-62 flex">
        <Sidebar />
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Applications</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Form ID</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">IOE Symbol No.</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">IOE Rank</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Name</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Gender</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">DOB</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Interested Programs</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">View Detail</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Confirmation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {forms.map(form => (
              <tr key={form.id}>
                <td className="border px-2 py-2 text-sm text-black">{form.id}</td>
                <td className="border px-2 py-2 text-sm text-black">{form.ioe_roll_no || 'N/A'}</td>
                <td className="border px-2 py-2 text-sm text-black">{form.ioe_rank || 'N/A'}</td>
                <td className="border px-2 py-2 text-sm text-black">{form.full_name || 'N/A'}</td>
                <td className="border px-2 py-2 text-sm text-black">{form.gender || 'N/A'}</td>
                <td className="border px-2 py-2 text-sm text-black">{form.date_of_birth || 'N/A'}</td>
                <td className="border px-2 py-2 text-sm text-black">{form.interested_course || 'N/A'}</td>
                <td className="border px-2 py-2 text-sm text-black">
                  <button
                    onClick={() => viewDetail(form.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Detail
                  </button>
                </td>
                <td className="border px-2 py-2 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAccept(form.id)}
                      className={`bg-green-500 text-white px-2 py-1 rounded ${form.status === 'accepted' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                      disabled={form.status === 'accepted'}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(form.id)}
                      className={`bg-red-500 text-white px-2 py-1 rounded ${form.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                      disabled={form.status === 'rejected'}
                    >
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ApplicationStatus;
