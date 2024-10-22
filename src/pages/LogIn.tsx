import { Button, TextField } from "@mui/material";

const LogIn = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-[450px] ">
        <h1 className="text-center font-bold text-xl">Sign up or Log in</h1>

        <form className="w-full">
          <div className="my-4">
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>
          <div>
            <Button sx={{ width: "100%", height: "50px" }}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
