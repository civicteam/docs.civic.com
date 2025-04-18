# How Civic Pass Works

### Overview

Civic Pass provides verification services through a two-step process: credential acquisition and credential presentation. This guide explains how users obtain credentials and how applications can verify them.

### User Credential Flow

#### 1. Obtaining a Credential

* User visits [https://icp-getpass.civic.com/](https://icp-getpass.civic.com/)
* Completes the chosen verification (CAPTCHA, Uniqueness, or Age)
* Upon successful verification, credential is stored in Civic Pass canister (73ncn-4qaaa-aaaag-alddq-cai)

#### 2. Using the Credential

* User visits an application that requires Civic Pass verification
* Application requests the user's credential
* User chooses to present their stored credential
* ICP automatically maps the credential between principals

### Application Integration Flow

#### 1. Credential Request

* Application detects need for verification
* Requests user's credential using their principal ID
* Civic Pass canister handles credential retrieval

#### 2. Principal Mapping

* User's original credential was obtained with their principal from icp-getpass.civic.com
* Application sees user with a different principal
* ICP handles mapping between these principals automatically
* No special handling needed by applications

#### 3. Verification

* Application receives verified credential
* Can proceed with protected operations

### Testing and Development

* Live demo available at[ https://icp-sign.civic.me/](https://icp-sign.civic.me/)
* Demonstrates complete verification flow
* Uses same underlying mechanisms as production
* Perfect for testing implementations

### Next Steps

Continue to the Implementation Guide for technical details on integrating Civic Pass into your application.
