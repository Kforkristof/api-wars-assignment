import connection_handler
import util


@connection_handler.connection_handler
def register_user(cursor, username, plain_text_password):
    password = util.hash_password(plain_text_password)
    cursor.execute('''INSERT INTO public.users (user_name, pw_hash) VALUES (%(user_name)s, %(hashed_password)s)''',
                   {'user_name': username, 'hashed_password': password})


@connection_handler.connection_handler
def check_existing_username(cursor, user_name):
    cursor.execute('''SELECT * FROM public.users WHERE user_name = %(user_name)s''', {'user_name': user_name})
    user_names = cursor.fetchone()
    return user_names


@connection_handler.connection_handler
def get_good_hash_by_user_name(cursor, user_name):
    cursor.execute('''SELECT pw_hash FROM public.users WHERE user_name = %(user_name)s''', {'user_name': user_name})
    password_hash = cursor.fetchall()[0]['pw_hash']
    return password_hash
