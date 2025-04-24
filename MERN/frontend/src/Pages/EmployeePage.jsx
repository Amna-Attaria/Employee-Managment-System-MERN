import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeDashboard from '../components/EmployeeDashboard';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const EmployeePage = () => {
	const navigate = useNavigate();
	const [isEmployee, setIsEmployee] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const checkEmployeeStatus = async () => {
			try {
				const token = localStorage.getItem('token');
				console.log("Token:", token);
if (!token) {
					console.error('No auth token found! Redirecting to login.');
					navigate('/login');
					return;
				}
				const response = await fetch(`${apiUrl}/auth/isEmployee`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();
				console.log('Employee Check Response:', data);

				if (data.success) {
					setIsEmployee(true);
				} else {
					console.log('User is not an employee, redirecting to login');
					navigate('/login');
				}
			} catch (error) {
				console.error('Error checking employee status:', error);
				navigate('/login');
			} finally {
				setLoading(false);
			}
		};

		checkEmployeeStatus();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!isEmployee) {
		return null;
	}

	return (
		<div>
			<EmployeeDashboard />
		</div>
	);
};

export default EmployeePage;