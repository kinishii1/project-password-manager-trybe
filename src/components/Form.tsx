import { useState } from 'react';
import Swal from 'sweetalert2';

type FormData = {
  name: string;
  login: string;
  password: string;
  url: string;
  id?: number;
};

type FormProps = {
  addItems: (item: FormData) => void;
};

function Form({ addItems }: FormProps) {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState({
    min: false,
    max: false,
    numberAndLetter: false,
    specialCharacter: false,
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    login: '',
    password: '',
    url: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (value: string, id: string) => {
    setFormData({ ...formData, [id]: value });

    const isComplete = Object.values(formData).every((item) => item !== '');
    const isPasswordValid = Object.values(passwordCheck).every(
      (item) => item === true,
    );
    if (
      isComplete && isPasswordValid
    ) {
      setIsFormComplete(true);
    }
  };

  const passwordChangeHandler = (value: string) => {
    setFormData({ ...formData, password: value });
    const newPasswordCheck = {
      min: value.length > 8,
      max: value.length < 16,
      numberAndLetter: /[0-9]/.test(value) && /[a-zA-Z]/.test(value),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
    setPasswordCheck(newPasswordCheck);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    Swal.fire({
      title: 'Serviço cadastrado com sucesso',
      timer: 1500,
      icon: 'success',
    });

    setFormData({
      name: '',
      login: '',
      password: '',
      url: '',
    });

    setIsFormComplete(false);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validClass = 'valid-password-check';
  const invalidClass = 'invalid-password-check';

  return (
    <>
      <div>
        <p
          className={
            passwordCheck.min
              ? validClass
              : invalidClass
          }
        >
          Possuir 8 ou mais caracteres
        </p>
        <p
          className={
            passwordCheck.max
              ? validClass
              : invalidClass
          }
        >
          Possuir até 16 caracteres
        </p>
        <p
          className={
            passwordCheck.numberAndLetter
              ? validClass
              : invalidClass
          }
        >
          Possuir letras e números
        </p>
        <p
          className={
            passwordCheck.specialCharacter
              ? validClass
              : invalidClass
          }
        >
          Possuir algum caractere especial
        </p>
      </div>
      <form onSubmit={ submitHandler }>
        <label htmlFor="name">Nome do serviço</label>
        <input
          required
          value={ formData.name }
          id="name"
          type="text"
          onChange={ (e) => changeHandler(e.target.value, e.target.id) }
        />

        <label htmlFor="login">Login</label>
        <input
          required
          value={ formData.login }
          id="login"
          type="text"
          onChange={ (e) => changeHandler(e.target.value, e.target.id) }
        />

        <label htmlFor="password">Senha</label>
        <input
          required
          value={ formData.password }
          id="password"
          type={ showPassword ? 'text' : 'password' }
          onChange={ (e) => passwordChangeHandler(e.target.value) }
        />
        <button
          data-testid="show-hide-form-password"
          type="button"
          onClick={ toggleShowPassword }
        >
          {showPassword ? 'Esconder' : 'Mostrar'}
        </button>

        <label htmlFor="url">URL</label>
        <input
          required
          value={ formData.url }
          id="url"
          type="text"
          onChange={ (e) => changeHandler(e.target.value, e.target.id) }
        />
        <button
          disabled={ !isFormComplete }
          type="submit"
          onClick={ () => addItems(formData) }
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}

export default Form;
