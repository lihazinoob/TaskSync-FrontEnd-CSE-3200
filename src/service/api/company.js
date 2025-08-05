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

// New function to get all companies a user is part of (created + joined)
export const fetchAllUserCompanies = async (userId) => {
  try {
    // Get companies the user created
    const createdCompaniesResponse = await fetchCompanyByUserID(userId);
    
    // Get accepted invitations to join companies
    const invitationsResponse = await getRecievedInvitationToJoinACompany();
    
    let allCompanies = [];
    
    // Add created companies
    if (createdCompaniesResponse.success) {
      allCompanies = [...createdCompaniesResponse.data];
    }
    
    // Add companies from accepted invitations
    if (invitationsResponse.success) {
      const acceptedInvitations = invitationsResponse.data.filter(
        invitation => invitation.status === 'ACCEPTED'
      );
      
      // For each accepted invitation, we need to get the company details
      // Since we don't have a direct API to get company by ID, we'll use the companyId from invitation
      const joinedCompanies = acceptedInvitations.map(invitation => ({
        id: invitation.companyId,
        companyName: invitation.companyName || `Company ${invitation.companyId}`,
        industry: invitation.companyIndustry || "N/A",
        // Add a flag to distinguish joined companies
        isJoined: true
      }));
      
      // Merge and remove duplicates based on company ID
      const existingCompanyIds = allCompanies.map(company => company.id);
      const uniqueJoinedCompanies = joinedCompanies.filter(
        company => !existingCompanyIds.includes(company.id)
      );
      
      allCompanies = [...allCompanies, ...uniqueJoinedCompanies];
    }
    
    return { success: true, data: allCompanies };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch all user companies.";
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
