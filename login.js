function LogIn(){
    const [status, setStatus]      = React.useState("");
    const [name, setName]          = React.useState("");
    const [email, setEmail]        = React.useState("");
    const [password, setPassword]  = React.useState("");
    const ctx = React.useContext(UserContext);
    let userObj = ""


    function validate(field, label){
        if(!field){
            setStatus("Error: " + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    };

    function emailExists(email) {
        return ctx.users.some(function(el) {
          userObj = ctx.users.filter(obj => obj.email === email);
          return el.email === email;
        }); 
    };

    function passwordConfirmation(password) {
        console.log(userObj[0].password)
        if(userObj[0].password === password){
            return true
        } else {
            return false
        }
    };

    function handleLogin(){
        if(ctx.currentUser.length === 1){
            setTimeout(() => setStatus(''), 1500);
            setEmail("");
            setPassword("");
            return setStatus("Already Logged In");
        } else {
            if(!validate(email, "email")) return alert("Enter E-Mail");
            if(!validate(password, "password")) return alert("Enter Password");
            if(emailExists(email) && passwordConfirmation(password)){
                setTimeout(() => setStatus(''), 1500);
                ctx.currentUser.push(userObj[0]);
                setEmail("");
                setPassword("");
                return setStatus("Log-In Successful")
            } else {
                setTimeout(() => setStatus(''), 1500);
                return setStatus("Incorrect Email or Password")
            }
        };
    };

    return(
        <Card
            bgcolor="warning"
            header="Log In"
            status={status}
            body={
                <>
                    E-Mail Address<br/>
                    <input type="input" className="form-control" id="email" placeholder="Enter E-Mail" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                    <button type="submit" className="btn btn-light" onClick={handleLogin}>Log In</button>
                </>
                }
        />
    );
};