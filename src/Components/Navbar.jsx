import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const Navbar = ({ onCustomize, onReset }) => {
    return (
        <div className="flex h-14 bg-gradient-to-b from-[#bde9ff] to-cyan-500 flex-row">
            <div className='flex items-center justify-center w-3/4 text-3xl text-gray-700 font-base'>Hello</div>
            <div className='flex justify-center w-1/4'>
                <Tooltip title="Customize">
                    <IconButton onClick={onCustomize}>
                        <TuneIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restart session">
                    <IconButton onClick={onReset}>
                        <RestartAltIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Login">
                    <IconButton >
                        <LoginIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div >
    )
}

export default Navbar;