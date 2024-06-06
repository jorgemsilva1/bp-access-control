import axios from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

export const Form = () => {
  const { control, formState, handleSubmit, register, reset } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const _handleSubmit = useCallback(
    async (values: { username: string }) => {
      if (values.username) {
        // Check if user already entered
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_ENDPOINT
          }/user-bacanas?filters[username][$eq]=${values.username}`
        );

        if (res.data.data.length > 0) {
          toast.error(
            `Erro: Acesso já garantido previamente a ${values.username}.`
          );
          return reset();
        }

        await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/user-bacanas`, {
          data: {
            username: values.username,
          },
        });
        toast.success(`Acesso garantido a ${values.username}.`);

        reset();
      }
      console.log(values);
    },
    [reset]
  );

  const _onError = useCallback(async (error: any) => {
    if (error.username) toast.error(`Erro: ${error.username.message}`);
  }, []);

  return (
    <>
      <img
        src="/logo_bacana.png"
        alt="log-bacana"
        style={{ marginBottom: 24 }}
      />
      <form onSubmit={handleSubmit(_handleSubmit, _onError)}>
        <label>Username</label>
        <Input
          {...register("username", {
            required: {
              value: true,
              message: "Username é óbrigatório.",
            },
          })}
        />

        <hr style={{ margin: "12px 0" }} />
        <Button>Validar</Button>
      </form>
    </>
  );
};

const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
  font-size: 16px;
`;

const Button = styled.button`
  background: orange;
`;
