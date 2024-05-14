import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function LearnerProgress() {
  const { lernerId } = useParams();

  return (
    <div>{ lernerId }</div>
  )
}
