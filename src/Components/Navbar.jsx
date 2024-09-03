import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const Navbar = ({ onCustomize, onReset }) => {
    return (
        <div className="flex h-16 bg-gradient-to-b from-[#bde9ff] to-cyan-500 flex-row p-4 justify-center md:justify-start">
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
            {/* <Tooltip title="Login">
                <IconButton >
                    <LoginIcon />
                </IconButton>
            </Tooltip> */}
        </div>
    )
}

export default Navbar;