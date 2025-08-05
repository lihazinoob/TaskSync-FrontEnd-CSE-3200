import axiosInstance from "./axiosInstance";

export const createCompany = async (companyData) => {
  try {
    const response = await axiosInstance.post("/api/companies", companyData);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create company.";
    return { success: false, message };
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await axiosInstance.get(`/api/companies`);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch companies.";
    return { success: false, message };
  }
};

export const fetchCompanyByUserID = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/companies/creator/${userId}/allcompanies`
    );
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch company by user ID.";
    return { success: false, message };
  }
};

export const sendInvitationtoPeopletoJoinCompany = async (invitationData) => {
  try {
    const response = await axiosInstance.post(
      `/api/invitations/invite`,
      invitationData
    );
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to send invitation.";
    return { success: false, message };
  }
};


// function to recieve the invitations send to a user 
export const getRecievedInvitationToJoinACompany = async () => {
  try {
    const response = await axiosInstance.get(`/api/invitations/received`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch received invitations.";
    return { success: false, message };
  }
};

// function to accept an invitation to join a company
export const acceptInvitationToJoinCompany = async (invitationId) => {
  try {
    const response = await axiosInstance.put(
      `/api/invitations/${invitationId}/accept`
    );
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to accept invitation.";
    return { success: false, message };
  }
};

// function to get the employees of a company
export const getEmployeesOfCompany = async (companyId) => {
  try {
    const response = await axiosInstance.get(
      `/api/companies/${companyId}/employees`
    );
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch company employees.";
    return { success: false, message };
  }
};
