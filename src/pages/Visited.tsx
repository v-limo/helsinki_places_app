import { Button, Container, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Countries } from '../components/Countries'
import { Loading } from '../components/Loading'
import { TableHead } from '../components/TableHead'
import { selectCountries } from '../features/countries/countriesSlice'
import { Box } from '@mui/system'
import _ from 'lodash'

export const Visited = () => {
  let { countries: data, isLoading } = useSelector(selectCountries)
  let countries = data?.filter((country) => country?.visited)
  const navigate = useNavigate()
  return (
    <Container maxWidth='lg' sx={{ minHeight: '90vh' }}>
      <Typography variant='h6' color='initial'>
        Visited Countries
      </Typography>
      <TableHead />
      {isLoading && <Loading />}
      {countries && <Countries countries={countries} />}
      {_.isEmpty(countries) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
          }}
        >
          <Typography variant='body1' color='primary'>
            It seem theres is no visited countries at the moment
          </Typography>
          <Button
            component='a'
            startIcon={<ArrowBackIcon fontSize='small' />}
            sx={{ mt: 3 }}
            variant='contained'
            onClick={() => navigate('/')}
          >
            Go back to Homepage
          </Button>
        </Box>
      )}
    </Container>
  )
}
