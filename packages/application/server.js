import { api } from '@english/api';
import admin from './admin';
import { getCookie } from './utils/get-cookie';
import { NextResponse } from 'next/server';

async function getCorrectToken(ctx) {
  const cookieToken = getCookie(ctx, 'token');
  const refreshToken = getCookie(ctx, 'refreshToken');
  const idToken = await refreshTokenIfNeeded(cookieToken, refreshToken);
  return idToken;
}

function unauthorize() {
  api.auth.signOut();
  NextResponse.redirect(new URL('/auth'));
}

export async function getUser(ctx) {
  const idToken = await getCorrectToken(ctx);
  if (!idToken) {
    unauthorize();
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const uid = decodedToken.uid;
  const userRecord = await admin.auth().getUser(uid);
  return userRecord.toJSON();
}

export async function refreshTokenIfNeeded(idToken, refreshToken) {
  try {
    await admin.auth().verifyIdToken(idToken, true);
    return idToken; // Токен еще валиден
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      const newToken = await getRefreshedIdToken(refreshToken);
      return newToken;
    }
    throw error;
  }
}

async function getRefreshedIdToken(refreshToken) {
  const response = await fetch(
    'https://securetoken.googleapis.com/v1/token?key=AIzaSyDHpXeyfCGqHyuqz8LlkHUPYAvl2DZZ5q4', // TODO в env
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    }
  );
  const data = await response.json();
  return data.id_token;
}
