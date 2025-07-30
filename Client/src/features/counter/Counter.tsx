import { Button, ButtonGroup, Input, Typography } from "@mui/material";
import { decrement, increment, incrementByValue, square} from "./counterSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Store";

export default function Counter() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState("");
    return (
        <>
            <Typography>{count} </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
                <Button onClick={() => dispatch(square())}>Square</Button>
            </ButtonGroup>
            <div>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} //Input değiştikçe güncellenir
                />
                <Button onClick={() => dispatch(incrementByValue(Number(amount) || 0))}>
                    Increment By Amount
                </Button>
            </div>
        </>
    )
}