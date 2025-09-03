import axiosInstance from '@/services/axios-instance';

export const fetchWorkspaceList = async () => {
    const result = await axiosInstance.post('/workspace/list');
    return result.data;
};
