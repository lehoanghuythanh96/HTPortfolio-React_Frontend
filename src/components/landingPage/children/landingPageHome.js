import React from "react";
import styled from "@emotion/styled";
import {Col, Container, Row} from "react-bootstrap";
import {Typography} from "@mui/material";
import {ClayCard} from "../../UI_Components/ClayCard";
import {MyProjectsTable} from "./myProjectsTable";
import "./landingHomePage.scss"
import {globalSettings} from "../../../environments/environments";
import {gradientBgOne} from "../../UI_Components/GradientBgOne";
import {BasicButton} from "../../UI_Components/Buttons";
import {dialogContent, toggleDialog} from "../../UI_Components/UI_Dialog";
import {UserProfileMenuCard} from "../../shared/authenticationShared/userProfileMenuCard";

export class LandingPageHome extends React.Component {
    render() {

        let TopBG = styled('div')`
          background: ${gradientBgOne};
          position: relative;
          height: 400px;
          width: 100%;
        `

        const BgCurve = () => {
            return (
                <div className="custom-shape-divider-bottom-1650445737">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                         preserveAspectRatio="none">
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            opacity=".25" className="shape-fill"></path>
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            opacity=".5" className="shape-fill"></path>
                        <path
                            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            className="shape-fill"></path>
                    </svg>
                </div>
            )
        }


        return(
            <Container fluid className="p-0">
                <Row>
                    <Col>
                        <TopBG>
                            {BgCurve()}
                            <Row className="align-items-center justify-content-center h-100">
                                <Col xs="auto" className="text-center" style={{height:"fit-content"}}>
                                    <Typography variant="h2" className="text-white">
                                        Thanh's portfolio
                                    </Typography>
                                </Col>
                            </Row>
                        </TopBG>
                    </Col>
                </Row>
                <Container>
                    <Row className="py-3">
                        <Col>
                            <Row>
                                <Col className="text-center">
                                    <Typography variant="h4" className="pb-3">
                                        Shortcuts
                                    </Typography>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    <BasicButton onClick={() => {
                                        toggleDialog.next(true)
                                        dialogContent.next(UserProfileMenuCard)
                                    }}>
                                        <Typography varian="h5"><i className="fa-solid fa-user"></i></Typography>
                                        <Typography variant="h6">User card</Typography>
                                    </BasicButton>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col className="d-none d-sm-block text-center col-12 col-sm-6">
                            <img src="/undraw_innovative_re_rr5i.svg" width={300} height={300}/>
                        </Col>
                        <Col className="col-12 col-sm-6">
                            <Typography variant="h4" color={globalSettings.secondaryTextColor}>
                                My projects
                            </Typography>
                            <Row className="py-4">
                                <Col>
                                    <ClayCard style={{width: 300}}>
                                        <MyProjectsTable></MyProjectsTable>
                                    </ClayCard>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col className="text-center">
                            <Typography className="fw-bold" color={globalSettings.secondaryTextColor} variant="h3">
                                Blog posts
                            </Typography>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}