import { FC, useState } from "react";
import { useLoginMutation, useTokenMutation } from "../../utils/auth/auth-hook";

const Login: FC = () => {
  const [login] = useLoginMutation();
  const [token] = useTokenMutation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResponse = await login({ username, password });
      if (loginResponse.error) {
        throw loginResponse.error;
      }

      const tokenResponse = await token(loginResponse.data.data.token);
      if (tokenResponse.error) {
        throw tokenResponse.error;
      }

      console.log(tokenResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-1/6 p-12">
      <div className="flex flex-col">
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          className="outline-0 border border-slate-400 px-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          className="outline-0 border border-slate-400 px-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <button
          type="submit"
          className="outline-0 border border-slate-400 cursor-pointer"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
