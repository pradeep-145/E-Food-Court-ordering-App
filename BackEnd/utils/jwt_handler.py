import jwt
from datetime import datetime,timedelta
secret_key='8d51c7c76f69ef6bc0b68ef2687357197f2d7a7e163709acb15f592b491c543c4646619e7553ab673e12a0603f56c0f95ca683b85a7bb9b3df690c17e70fb2bb75735298bcbe4271ca3b55194f898e53abeb192c7862e196e70e7c38d4d3cd73ad01661db9d6afed3c45ad253f68b9fd0d90d11befaeab0499d04709079c993c71535847ff2e005be779e3544da5dbc3e7cfd41ac24f476edf5009b043f703d4989cc293a32df43326b26757df3493c52378d0940db0a857f3ea0830878d72dd69fbe019caa319a01d596acd133b8c74898757e691fff43b47f7370e5013b76d9ced4894557d30a8b9fd553abbeaab6f7577ccc6ba8f4a8b3e165bf4c9c95a28'


def create_token(username):
    payload={
        "username":username,
        "exp":datetime.utcnow()+timedelta(hours=720)
    }

    token=jwt.encode(payload,secret_key,algorithm='HS256')
    return token

def verify_token(token):
    try:
        payload=jwt.decode(token,secret_key,algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return "Token expired!"
    except jwt.InvalidTokenError:
        return "Invalid token!"
    
     