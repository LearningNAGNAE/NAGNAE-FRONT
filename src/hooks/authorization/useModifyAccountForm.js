import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modifyAccount } from '../../contexts/authorization/ModifyAccountApi';

export function useModifyAccountForm() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))

  const [formData, setFormData] = useState({
    userno: userData.apiData.userno,
    email: userData.apiData.email,
    fileno: userData.apiData.fileno,
    password: '',
    username: userData.apiData.username,
    nationlity: userData.apiData.nationlity,
    userhp: userData.apiData.userhp,
    file: null
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { className, value } = e.target;
    const trimmedValue = value.replace(/\s/g, ''); // 공백 제거
    if (className === 'passwordConfirm') {
      setPasswordConfirm(trimmedValue);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [className]: trimmedValue
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        file: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (formData.password) {
      if (!validatePassword(formData.password)) {
        tempErrors.password = "비밀번호는 6자리 이상이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";
      } else if (formData.password !== passwordConfirm) {
        tempErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      }
    }
    if (!formData.username) tempErrors.username = "이름을 입력해주세요.";
    if (!formData.nationlity) tempErrors.nationlity = "국적을 입력해주세요.";
    if (!formData.userhp) tempErrors.userhp = "전화번호를 입력해주세요.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const ModifyInfo = await modifyAccount(formData);
        console.log('회원정보 수정:', ModifyInfo);
        navigate('/');
      } catch (err) {
        setErrors({ form: '회원정보 수정 중 오류가 발생했습니다.' });
      }
    }
  };

  return { formData, passwordConfirm, previewUrl, handleChange, handleFileChange, handleSubmit, errors };
}