import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Profile from "../RegisterFormSteps/Profile";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import UndoIcon from "@mui/icons-material/Undo";
import SavingsIcon from "@mui/icons-material/Savings";
import { IconButton } from "@mui/material";
import Bank from "../RegisterFormSteps/Bank";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import PreviewRegisterForm from "../PreviewRegisterForm";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { postData } from "../../server_utils/fetchData";
import { error, success } from "../Notify";

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( to bottom right, #0d9db8 0%, #0b7b8f 50%, #074954 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( to bottom right, #0d9db8 0%, #0b7b8f 50%, #074954 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( to bottom right, #0d9db8 0%, #0b7b8f 50%, #074954 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( to bottom right, #0d9db8 0%, #0b7b8f 50%, #074954 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <GroupAddIcon />,
    2: <SavingsIcon />,
    3: <PersonPinIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["Enter Profile Details", "Enter Bank Details", "Create Account"];

export default function HorizontalLinearStepper() {
  const router = useRouter();
  console.log(router.query);

  const [profileFormik, setProfileFormik] = useState();
  const [bankFormik, setBankFormik] = useState();
  const stepComponents = [
    <Profile setFormik={setProfileFormik} formik={profileFormik} />,
    <Bank setFormik={setBankFormik} formik={bankFormik} />,
    <PreviewRegisterForm
      formData={{ ...profileFormik?.values, ...bankFormik?.values }}
    />,
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [state, dispatch] = useContext(DataContext);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep == 0) {
      () => profileFormik.handleSubmit();

      if (!(Object.keys(profileFormik.errors).length === 0)) return;
    }
    if (activeStep == 1) {
      () => bankFormik.handleSubmit();

      if (!(Object.keys(bankFormik.errors).length === 0)) return;
    }

    if (activeStep == 2) return;

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/registerSeller", {
      ...profileFormik.values,
      ...bankFormik.values,
    });
    dispatch({ type: "NOTIFY", payload: { loading: false } });

    if (res.err) return error(res.err);
    router.push("/login");
    return success(res.msg);
  };

  return (
    <Box sx={{ width: "100%" }} className="stepper-main mt-100">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {stepComponents[activeStep]}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <IconButton
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                mr: 1,
                position: "fixed",
                top: "50%",
                left: 25,
                transform: "translate(0%, -50%)",
              }}
              className="stepper-btn"
            >
              <span>Back</span>
            </IconButton>
            <Box sx={{ flex: "1 1 auto" }} />

            <IconButton
              onClick={handleNext}
              sx={{
                position: "fixed",
                top: "50%",
                right: 25,
                transform: "translate(0%, -50%)",
              }}
              className="stepper-btn"
            >
              {activeStep === steps.length - 1 ? (
                <span onClick={handleSubmit}>Submit</span>
              ) : (
                <span>Next</span>
              )}
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
}
