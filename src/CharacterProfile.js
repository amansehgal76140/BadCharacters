import React from 'react';
import Box from '@material-ui/core/Box';
import  Button  from '@material-ui/core/Button';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import  Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import  Paper  from '@material-ui/core/Paper';
const useStyles = makeStyles(theme=>({
 image:{
     width:300,
     height:300,
     borderRadius:"50%"
 },
 informationRecord:{
     borderRadius:theme.spacing(1),
     padding:theme.spacing(2),
     margin:theme.spacing(2),
     marginTop:theme.spacing(6),
 },
 container:{
     backgroundColor:theme.palette.background.default,
     minHeight:'100vh'
 }
}))

const CharacterProfile=({selectedCharacter,setIsCharacterSelected})=>{
  
  const classes=useStyles();  
  return (
      <Box className={classes.container}>
        <Button 
            startIcon={<KeyboardBackspaceOutlinedIcon />}
            onClick={()=>setIsCharacterSelected(false)}
        >
            Back
        </Button>
        <Box display={'flex'} justifyContent={'center'} marginY={3}>
            <img 
                src={`${selectedCharacter.img}`} 
                alt={`${selectedCharacter.name}`} 
                className={classes.image} 
            />
        </Box>
        <Paper className={classes.informationRecord}>
          <Box marginY={2}>
            <Typography variant='h5'>Personal Information</Typography>
          </Box>
          <Grid container spacing={8} >
           <Grid item>
             <Typography variant={'subtitle1'}>Name</Typography>
             <Typography variant={'subtitle1'}>Date of Birth</Typography>
             <Typography variant={'subtitle1'}>Nickname</Typography>
             <Typography variant={'subtitle1'}>Occupation</Typography>
             <Typography variant={'subtitle1'}>Status</Typography>
             <Typography variant={'subtitle1'}>Actor who Portrays the Character</Typography>
             <Typography variant={'subtitle1'}>Season in Which Character Appears</Typography>
           </Grid>
           <Grid item>
             <Typography variant={'subtitle1'}>-</Typography>
             <Typography variant={'subtitle1'}>-</Typography>
             <Typography variant={'subtitle1'}>-</Typography>
             <Typography variant={'subtitle1'}>-</Typography>
             <Typography variant={'subtitle1'}>-</Typography>
             <Typography variant={'subtitle1'}>-</Typography>
             <Typography variant={'subtitle1'}>-</Typography>
           </Grid>
           <Grid item>
             <Typography variant={'subtitle1'}>{selectedCharacter.name}</Typography>
             <Typography variant={'subtitle1'}>{selectedCharacter.birthday}</Typography>
             <Typography variant={'subtitle1'}>{selectedCharacter.nickname}</Typography>
             <Typography variant={'subtitle1'}>
                {selectedCharacter.occupation.map((occup,index)=>{
                   return (
                       <span key={index}>
                            {index !== selectedCharacter.occupation.length-1 ?occup + " , " : occup+" ."}
                       </span>
                   );
                })}
             </Typography>
             <Typography variant={'subtitle1'}>{selectedCharacter.status}</Typography>
             <Typography variant={'subtitle1'}>{selectedCharacter.portrayed}</Typography>
             <Typography variant={'subtitle1'}>
                {selectedCharacter.appearance.map((occup,index)=>{
                    return (
                        <span key={index}>
                             {index !== selectedCharacter.appearance.length-1 ?occup + " , " : occup+" ."}
                        </span>
                    );
                })}
             </Typography>
           </Grid>
          </Grid>
        </Paper>
      </Box>
  );
}
export default CharacterProfile;