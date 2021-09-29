import { Store } from '@reduxjs/toolkit';
import { NextComponentType, NextPageContext } from 'next';
import { AppContext } from 'next/app';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';

export interface MyNextPageContext extends NextPageContext {
  store: Store;
}

export interface MyAppContext extends AppContext {
  ctx: NextPageContext & {
    store?: Store;
  };
}
