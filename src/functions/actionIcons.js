import ToolTipForButton from '../components/Tooltipforbutton/ToolTipforButton'
import { ReactComponent as Eyes } from '../assets/images/teyes.svg'
import { ReactComponent as No } from '../assets/images/Cross Mark.svg'
import { ReactComponent as Yes } from '../assets/images/yes.svg'
import { ReactComponent as Delete } from '../assets/images/tdelete.svg'
import { ReactComponent as BanUser } from '../assets/images/Banred.svg'
import { ReactComponent as UnBanUser } from '../assets/images/Unbangreen.svg'
import { ReactComponent as ChangePassword } from '../assets/images/change-password-icon.svg'
import { ReactComponent as Userlogin } from '../assets/images/userlogin.svg'
import { ReactComponent as Edit } from '../assets/images/tedit.svg'
import { ReactComponent as DeleteRed } from '../assets/images/deleteRed.svg'
import { ReactComponent as UnReport } from '../assets/images/report.svg'
import { ReactComponent as Email } from '../assets/images/actionEmailicon.svg'
import { ReactComponent as PendingLogo } from '../assets/images/pendingLogo.svg'
import { CircleMenuItem } from 'react-circular-menu'

export const banUserIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <BanUser />
            </span>
        }
        overlay="Ban"
    />
)
export const actionEmailicon = (
    <ToolTipForButton
        Cmp={
            <span>
                <Email />
            </span>
        }
        overlay="Mail"
    />
)
export const pendingActionButton = (
    <ToolTipForButton
        Cmp={
            <span>
                <PendingLogo />
            </span>
        }
        overlay="Declined"
    />
)
export const viewIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <Eyes />
            </span>
        }
        overlay="View"
    />
)
export const unbanUserIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <UnBanUser />
            </span>
        }
        overlay="Unban"
    />
)
export const loginIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <Userlogin />
            </span>
        }
        overlay="Login"
    />
)
export const deleteActionIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <Delete />
            </span>
        }
        overlay="Delete"
    />
)
export const changepasswordIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <ChangePassword />
            </span>
        }
        overlay="Change Password"
    />
)
export const approverecruiterIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <Yes />
            </span>
        }
        overlay="Approve"
    />
)
export const declinerecruiterIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <No />
            </span>
        }
        overlay="Decline"
    />
)
export const editactionIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <Edit />
            </span>
        }
        overlay="Edit"
    />
)

export const reddeleteActionIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <DeleteRed />
            </span>
        }
        overlay="Delete"
    />
)
export const unReportActionIcon = (
    <ToolTipForButton
        Cmp={
            <span>
                <UnReport />
            </span>
        }
        overlay="UnReport"
    />
)

// const actionIcons={}
