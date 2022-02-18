import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type GetBuildProps = {
    sessionToken: string;
    fetchBuild: () => void;
};

type FetchBuildState = {
    id: number;
    name: string;
    description: string;
    Complete: boolean;
    totalPrice: number;
};

// export default GetBit;