import { GoogleLogin } from 'react-google-login'
import { googleLogin } from './../features/auth/googleLogin'
import { useDispatch } from 'react-redux'

export const Login = () => {
  const dispatch = useDispatch()

  const responseGoogle = (response) => {
    console.log(response)
    if (response && response.tokenId) {
      dispatch(googleLogin({ token: response.tokenId }))
      console.log({ token: response.tokenId })
    }
  }

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText='Login With google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
